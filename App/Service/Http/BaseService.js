import TokenService from "./TokenService";
import RequestClient from "./RequestClient";

export default class BaseService extends RequestClient {
  constructor() {
    super();
    const token = TokenService.getToken();
    if (TokenService.check(token)) {
      this.setHeader(token.key, token.token);
    }
  }
}
