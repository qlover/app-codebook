import { API } from "../Config/env";
import { stringify } from "qs";
import { RequestIon } from "../Config/ServiceApi";
import { isObject, omitBy } from "lodash";

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

  request(ion: RequestIon, params?: object) {
    let url = API + ion.api;
    let init = {
      method: ion.method,
      headers: this.headers,
      mode: "cors",
    };

    // GET 和 HEAD 方法没有主体
    if ("GET" == ion.method || "HEAD" == ion.method) {
      const querystring = stringify(params);
      url = [url, querystring].join("?");
    } else {
      // 去掉为空的值, '' 和 null
      // 其余可以有主体
      if (isObject(params) && (params = omitBy(params, filterParams))) {
        init.body = JSON.stringify(params);
      }
    }
    return RequestClient.send(new Request(url, init));
  }

  static send(req: Request) {
    return fetch(req)
      .then((res) => {
        if (res.status != 200) {
          console.debug("er1", res);
          return Promise.reject(res.json());
        }
        return res;
      })
      .then(
        (res) => res.json(),
        (res) => {
          console.debug("er2", res);
          return res;
        }
      )
      .then((res) => (res.error ? Promise.reject(res.error) : res));
    // 后面自行捕获信息
  }
}
