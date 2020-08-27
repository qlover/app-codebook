import NetInfo from "@react-native-community/netinfo";

export default class NetWork {
  static hasNet(): boolean {
    return true;
  }

  static isWifi(): boolean {
    return true;
  }

  static isGPRS(): boolean {
    return NetWork.isCellular();
  }

  static isCellular(): boolean {
    return true;
  }
}
