import Validation, { ValidationException } from "../Lib/Validation";

export default class DictSaveRequest {
  static rule = {
    id: "number|min:1",
    title: "required",
    website: "domain",
    username: "required",
    password: "required",
    phone: "phone",
    email: "email",
  };

  static message = {
    "id.number": "ID错误",
    "id.min": "ID错误",
    "title.required": "标题不能为空",
    "website.domain": "站点域名格式不正确",
    "username.required": "用户名不能为空且长度在7-20位",
    "password.required": "密码不能为空",
    phone: "手机号码不正确",
    email: "邮箱不正确",
  };

  static validation(args) {
    console.debug("validation");
    try {
      new Validation(DictSaveRequest.rule, DictSaveRequest.message).validated(
        args
      );
      return args;
    } catch (e) {
      if (e instanceof ValidationException) {
        return Promise.reject(e.message);
      } else {
        return Promise.reject(e.message);
      }
    }
  }
}
