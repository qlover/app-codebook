export const dict = {
  OK: "请求成功",
  created: "创建成功",
  "arg.invalid": "参数非法",
  "auth.token.empty": "token 不能为空",
  "auth.token.fail": "token 验证失败",
  "auth.token.invalid": "token 已失效",
  "auth.user.exists": "该用户已经存在",
  "auth.user.notexist": "该用户不存在",
  "auth.user.wrong_password": "账号密码不正确",
  "serve.error": "服务器错误",
};
const getMsgByKey = (key) => (dict[key] ? dict[key] : key);

export default getMsgByKey;
