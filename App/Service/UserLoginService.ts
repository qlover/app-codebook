import { API_USER_LOGIN, API_USER_REGISTER, LOCAL_JWTTOKEN_KEY } from "../Config/ServiceApi"
import BaseService from './BaseService'

export const login = (username: string, password: string) => {
  return BaseService.request(API_USER_LOGIN, {
    username, password
  });
}

export const signup = (username: string, password: string) => {
  return BaseService.request(API_USER_REGISTER, {
    username, password
  });
}


