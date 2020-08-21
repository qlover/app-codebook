import {
  jwtToken,
  createAction,
  initialToken,
  invalidAction,
} from "../Redux/TokenRedux";
import store from "../Redux/createStrore";

export default class TokenService {
  /**
   * 获取登录的token
   *
   */
  static getToken = () => {
    const reducers = store.getState();
    if (reducers && reducers.TokenReducer) {
      return reducers.TokenReducer;
    }
    return initialToken;
  };

  /**
   * 设置 token
   *
   * @param {jwtToken} state
   */
  static setToken = (state: jwtToken) => store.dispatch(createAction(state));

  static invaldToken = () => store.dispatch(invalidAction);

  static check(payload: jwtToken): boolean {
    if (payload.void || !payload.token) {
      return false;
    }
    return true;
  }
}
