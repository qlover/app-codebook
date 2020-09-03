export const dict = {
  // network
  "net.none": "连接你的网络",
  "net.request.timeout": "请求超时",
  "net.request.toomany": "请求频繁，请稍后重试",
  "net.request.error": "网络错误",
  "net.request.fail": "请求失败",
  "net.response.notjson": "服务器响应失败",
  OK: "请求成功",
  created: "创建成功",

  // modal

  // tip
  "tip.auth.fail": "请重新登录",
  
  // api
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
