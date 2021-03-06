import { API } from "../Config/env";
import { stringify } from "qs";
import { RequestIon, RequestOptions } from "../Contracts/Types/Service";
import { isObject, omitBy, isEmpty, pick, identity } from "lodash";

// null 和 undefined 一次性判断用 ==
export const filterParams = (param) => "" === param || undefined == param;

let Signal: AbortController;

const defaultResponseFulfilled = (res) => {
  const { status } = res;
  if (200 !== status) {
    if (408 === status || 504 === status) {
      Signal && Signal.abort();
      return Promise.reject("net.request.timeout");
    }
    return Promise.reject("net.request.error");
  }

  // 成功后响应为 JSON
  return res
    .json()
    .then(identity, (err) => Promise.reject("net.response.notjson"));
};
const defaultResponseRejected = (res) => {
  Signal && Signal.abort();
  return Promise.reject(res);
};

const timeoutPromise = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Response("timeout", { status: 504, statusText: "timeout" }));
    }, timeout);
  });
};

export const _RequestOptions: RequestOptions = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  mode: "cors",
  delay: 10,
  timeout: 5000,
};

/**
 * - timeout polyfill
 * @see https://github.com/robinpowered/react-native-fetch-polyfill/blob/master/fetch-polyfill.js
 *
 */
export default class RequestClient {
  constructor(options: RequestOptions) {
    this.options = { ..._RequestOptions, ...options };
    this.interceptor = {
      request: [],
      response: [],
    };

    // 拦截超时响应
    this.after(defaultResponseFulfilled, defaultResponseRejected);
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
   * 注册请求拦截
   *
   * promise 参数默认接收 request 参数二
   *
   * @param {Function} onfulfilled
   * @param {object} args
   * @param {Function} onrejected
   */
  before(onfulfilled, args = {}, onrejected = null) {
    this.interceptor.request.unshift({ onfulfilled, onrejected, args });
    return this;
  }

  /**
   * 注册响应拦截
   * @param {Function} onfulfilled
   * @param {Function} onrejected
   */
  after(onfulfilled, onrejected = null) {
    this.interceptor.response.push({ onfulfilled, onrejected });
    return this;
  }

  /**
   * 获取请求前的拦截 promise
   * @param {any} params 参数
   */
  getRequestInterceptor(params): Promise<any> {
    let promise = Promise.resolve(params);
    this.interceptor.request.forEach((cept) => {
      promise = promise.then(cept.onfulfilled, cept.onrejected);
    });
    return promise;
  }

  /**
   * 解析请求参数
   *
   * @param {RequestIon} ion
   * @param {object|null} params
   * @returns {object} {url, init}
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

  request(ion: RequestIon, params?: object) {
    let promise;
    const input = this.parse(ion, params);

    // 请求拦截
    if (this.interceptor.request.length) {
      // !!! 强制使用请求对象作为后面参数
      promise = this.getRequestInterceptor(params).then((args) => input);
    } else {
      promise = Promise.resolve(input);
    }

    // 发送请求
    promise = promise.then(RequestClient.send);

    // 响应拦截
    this.interceptor.response.forEach((cept) => {
      promise = promise.then(cept.onfulfilled, cept.onrejected);
    });

    return promise;
  }

  static send({ url, init }) {
    console.info(`[info][http send] ${url}`);
    // -FIXME 手动使用 AbortControler 中止
    Signal = new AbortController();
    init.signal = Signal.signal;
    return Promise.race([timeoutPromise(init.timeout), fetch(url, init)]);
  }
}
