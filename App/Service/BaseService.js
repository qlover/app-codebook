import { RequestIon } from "../Config/ServiceApi";
import { API } from "../Config/env";
export default class BaseService {
  static request(ion: RequestIon, params?: object) {
    const url = API + ion.api;
    const req = new Request(url, {
      method: ion.method,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      mode: "cors",
      body: JSON.stringify(params),
    });
    return (
      fetch(req)
        .then((res) => res.json())
        .then((res) => (res.error ? Promise.reject(res) : res)) //响应内容有错误信息
    );
    // 后面自行捕获信息
  }
}
