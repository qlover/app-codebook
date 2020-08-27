import { API } from "../../Config/env";
import { stringify } from "qs";
import { RequestIon } from "../../Contracts/Types/Service";
import { isObject, omitBy, isEmpty } from "lodash";
import { ByKey } from "../../Contracts/RetJson";
import Container from "../../Container/Container";

// null 和 undefined 一次性判断用 ==
export const filterParams = (param) => "" === param || undefined == param;

export default class RequestClient {
  constructor() {
    this.headers = {
      "Content-Type": "application/json;charset=UTF-8",
    };
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  parse(ion: RequestIon, params?: object) {
    let url = API + ion.api;
    let init = {
      method: ion.method,
      headers: this.headers,
      mode: "cors",
    };

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
    let promise = Promise.resolve(this.parse(ion, params));

    // 请求拦截
    promise = promise.then((input) => {
      return input;
    });

    // 发送
    promise = promise.then(RequestClient.send);

    // 响应拦截
    promise = promise.then((res: ByKey) => {
      // 认证错误
      if (40102 == res.code) {
        console.log(Container.screen.navigation());
        Container.screen.navigation().replace("Auth");
        return Promise.reject(res.error);
      } else if (res.error) {
        // @TIP 抛出错误 key
        return Promise.reject(res.error);
      }
      return res;
    });

    // 返回响应
    return promise;
    // TODO: 当发生 net.request.error 应该取消掉当次请求(可能是超时，可能是请求发送已经失败)
  }

  static send({ url, init }): Promise<ByKey> {
    // FIXME:当请求错误了不能停止当次请求
    return fetch(new Request(url, init)).then(
      (res) => res.json(),
      (res) => Promise.reject("net.request.error")
    );
  }
}
