import TokenService from "../Local/TokenService";
import RequestClient from "../../Lib/RequestClient";
import Toast from "../Sys/Toast";
import Container from "../../Container/Container";

// 默认的 响应拦截
const defaultResponseFulfilled = (res) => {
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
};


export default class BaseService {
  constructor() {}
  api() {
    const token = TokenService.getToken();
    let req = new RequestClient();
    if (TokenService.check(token)) {
      req.setHeader(token.key, token.token);
    }
    // 拦截成功响应后的 json
    return req.after(defaultResponseFulfilled);
  }
}
