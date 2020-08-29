import { API_USER_LOGIN, API_USER_REGISTER } from "../../Config/api";
import RequestClient from "../../Lib/RequestClient";
import UserLoginRequest from "../../Validation/UserLoginRequest";

export const login = (username: string, password: string) => {
  return new RequestClient()
    .before(UserLoginRequest.validation)
    .request(API_USER_LOGIN, { username, password });
};

export const signup = (username: string, password: string) => {
  return new RequestClient()
    .before(UserLoginRequest.validation)
    .request(API_USER_REGISTER, {
      username,
      password,
    });
};
