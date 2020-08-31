import Validation, { ValidationException } from "../Lib/Validation";

export default class UserLoginRequest {
  static rule = {
    username: "required|length:5,20",
    password: "required|password",
  };

  static message = {
    "username.required": "用户名不能为空",
    "username.length": "用户名长度在7-20位",
    "password.required": "密码不能为空",
    "password.password": "密码最少6位，包括至少1个小写字母，1个数字",
  };

  static validation(args): Promise<any> {
    try {
      new Validation(UserLoginRequest.rule, UserLoginRequest.message).validated(
        args
      );
      return args;
    } catch (e) {
      if (e instanceof ValidationException) {
        return Promise.reject(e);
      } else {
        return Promise.reject(e);
      }
    }
  }
}
