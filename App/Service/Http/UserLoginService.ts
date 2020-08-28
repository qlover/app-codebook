import { API_USER_LOGIN, API_USER_REGISTER } from "../../Config/api"
import RequestClient from "./RequestClient";

export const login = (username: string, password: string) => {
  return (new RequestClient()).requestBefore(args => {
    return args;
  }).request(API_USER_LOGIN, { username, password });
}

export const signup = (username: string, password: string) => {
  return (new RequestClient()).request(API_USER_REGISTER, {
    username, password
  });
}


