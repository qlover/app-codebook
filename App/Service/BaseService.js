import { RequestIon } from "../Config/ServiceApi";
import { API } from "../Config/env";
import { resolveMx } from "dns";
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
    // 拦截HTTP状态和响应内容状态
    return (
      fetch(req)
        // 非 200 的响应都拦截
        .then(
          (res) => (res.status != 200 ? Promise.reject(res) : res),
          (error) => Promise.reject(error)
        )
        // http 响应成功后得到响应 api json 数据
        .then(
          (res) => res.json(),
          (error) => Promise.reject(error) // 响应状态不是200
        )
        // 拦截 json api 响应后的结果
        .then(
          (res) => (res.error ? Promise.reject(res.error) : res), //响应内容有错误信息
          (error) => Promise.reject(error)
        )
      // 后面自行捕获信息
    );
  }
}
