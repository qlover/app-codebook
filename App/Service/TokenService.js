import AsyncStorage from "@react-native-community/async-storage";
import { LOCAL_JWTTOKEN_KEY } from "../Config/ServiceApi";
import {
  jwtToken,
  TokenReducer,
  createAction,
  initialState,
  encodeJwtToken,
  decodeJwtToken,
} from "../Redux/TokenRedux";

export default class TokenService {
  /**
   * 获取登录的token
   *
   * PS:如果需要同步获取 token,则调用该方法的方法需要使用 async 和 await 获取
   */
  static getToken = () =>
    AsyncStorage.getItem(LOCAL_JWTTOKEN_KEY)
      .then((token) => (token ? decodeJwtToken(token) : initialState))
      .catch(() => initialState);

  /**
   * 设置 token
   *
   * PS:如果需要同步设置 token,则调用该方法的方法需要使用 async 和 await
   *
   * @param {jwtToken} state
   */
  static setToken = (state: jwtToken): Promise<boolean> =>
    AsyncStorage.setItem(LOCAL_JWTTOKEN_KEY, encodeJwtToken(state))
      .then(() => true)
      .catch(() => false);

  /**
   * 同步得到本地token
   */
  static getLocalToken = async (): Promise<jwtToken> =>
    await TokenService.getToken();
}
