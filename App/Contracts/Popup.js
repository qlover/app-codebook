// 弹窗类型
// 关于弹出窗口,吐丝,或者是提示都应该实现该接口
export default class Popup {
  constructor() {}

  show(options) {
    alert(options.message);
  }
}
