import Popup from "../../Contracts/Popup";
import { Toast as NativeToast } from "native-base/src/basic/Toast";
import {} from '@codler/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareHOC'
export default class Toast extends Popup {
  constructor() {
    super();
  }

  showText(text) {
    // alert(options.message);
    NativeToast.show({ text });
  }
  show(options) {
    NativeToast.show({ text: options.message });
  }
}
