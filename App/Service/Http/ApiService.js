import TokenService from "../Local/TokenService";
import RequestClient from "../../Lib/RequestClient";

export default class BaseService {
  constructor() {}
  api() {
    const token = TokenService.getToken();
    if (TokenService.check(token)) {
      return new RequestClient().setHeader(token.key, token.token);
    }
    return new RequestClient();
  }
}
