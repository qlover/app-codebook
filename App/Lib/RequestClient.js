import { API } from "../Config/env";
import { stringify } from "qs";
import { RequestIon, RequestOptions } from "../Contracts/Types/Service";
import { isObject, omitBy, isEmpty, pick } from "lodash";
import { ByKey } from "../Contracts/RetJson";
import Container from "../Container/Container";
import Toast from "../Service/Sys/Toast";

// null 和 undefined 一次性判断用 ==
export const filterParams = (param) => "" === param || undefined == param;

export const _RequestOptions: RequestOptions = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  mode: "cors",
  delay: 10,
  timeout: 8000,
  interceptor: {
    request: [],
    response: [],
  },
};

export class Queue {}

/**
 * - timeout polyfill
 * @see https://github.com/robinpowered/react-native-fetch-polyfill/blob/master/fetch-polyfill.js
 *
 */
export default class RequestClient {
  constructor(options: RequestOptions) {
    this.options = { ..._RequestOptions, ...options };

    // 绑定一个默认的 请求拦截
    this.after((res: ByKey) => {
      // 认证错误
      if (40102 == res.code) {
        new Toast().show({ message: res.error });
        Container.screen.navigation().replace("Auth");
        return Promise.reject(res.error);
      } else if (res.error) {
        // @TIP 抛出错误 key
        return Promise.reject(res.error);
      }
      return res;
    });
  }

  /**
   * 设置请求头
   * @param {string} key 键
   * @param {string} value 值
   */
  setHeader(key: string, value: string): this {
    this.options.headers[key] = value;
    return this;
  }

  /**
   * 解析请求对象
   * @param {RequestIon} ion
   * @param {object|null} params
   */
  parse(ion: RequestIon, params?: object): Request {
    let init = pick(this.options, "mode", "headers", "timeout");
    let url = API + ion.api;
    init.method = ion.method;

    if (!isEmpty(params) && isObject(params)) {
      // GET 和 HEAD 方法没有主体
      if ("GET" == ion.method || "HEAD" == ion.method) {
        const querystring = stringify(params);
        url = [url, querystring].join("?");
      } else if ((params = omitBy(params, filterParams))) {
        // 去掉为空的值, '' 和 null,其余可以有主体
        init.body = JSON.stringify(params);
      }
    }
    return { url, init };
  }

  /**
   * 注册请求拦截
   *
   * promise 参数默认接收 request 参数二
   *
   * @param {Function} onfulfilled
   * @param {object|null} args
   * @param {Function} onrejected
   */
  before(onfulfilled, args = null, onrejected = null) {
    this.options.interceptor.request.unshift({ onfulfilled, onrejected, args });
    return this;
  }

  /**
   * 注册响应拦截
   * @param {Function} onfulfilled
   * @param {Function} onrejected
   */
  after(onfulfilled, onrejected = null) {
    this.options.interceptor.response.unshift({ onfulfilled, onrejected });
    return this;
  }

  /**
   * 获取请求前的拦截 promise
   * @param {any} params 参数
   */
  getRequestInterceptor(params): Promise<any> {
    let promise = Promise.resolve(params);
    this.options.interceptor.request.forEach((cept) => {
      promise = promise.then(cept.onfulfilled, cept.onrejected);
    });
    return promise;
  }

  request(ion: RequestIon, params?: object) {
    const input = this.parse(ion, params);

    let promise;

    // 请求拦截
    if (this.options.interceptor.request.length) {
      // !!! 强制使用请求对象作为后面参数
      promise = this.getRequestInterceptor(params).then((args) => input);
    } else {
      promise = Promise.resolve(input);
    }

    // 发送请求
    promise = promise.then(RequestClient.send);

    // 响应拦截
    this.options.interceptor.response.forEach((cept) => {
      promise = promise.then(cept.onfulfilled, cept.onrejected);
    });

    return promise;
  }

  /**
   * @deprecated
   * @param {*}
   */
  static __send({ url, init }) {
    /**
     * 使用 polyfill 设置超时和中止
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController
     */
    return fetch(url, init).then(
      (res) => res.json(),
      (res) => Promise.reject("net.request.error")
    );
  }

  static send({ url, init }) {
    // TODO: 当发生 net.request.error 应该取消掉当次请求(可能是超时，可能是请求发送已经失败),fetch 暂时不支持超时设置
    // FIXME:当请求错误了不能停止当次请求
    const Signal = new AbortController();
    init.signal = Signal.signal;
    return Promise.race([
      RequestClient.timeoutPromise(init.timeout),
      fetch(url, init),
    ]).then(
      (res) => {
        // 响应超时
        if (504 === res.status) {
          Signal.abort();
          return Promise.reject("net.request.timeout");
        }
        return res.json();
      },
      (res) => {
        Signal.abort();
        return Promise.reject("net.request.error");
      }
    );
  }

  static timeoutPromise(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          new Response("timeout", { status: 504, statusText: "timeout" })
        );
      }, timeout);
    });
  }
}
