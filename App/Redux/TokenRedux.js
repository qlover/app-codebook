/** TYPE */
export const TOKEN_CREATE = "TOKEN_CREATE";
export const TOKEN_GET = "TOKEN_GET";
export const TOKEN_CHECK = "TOKEN_CHECK";
export const TOKEN_REFRESH = "TOKEN_REFRESH";
export const TOKEN_INVALID = "TOKEN_INVALID";

export type jwtToken = {
  key: string,
  repeat: boolean,
  void: boolean,
  token: string,
  // type: 'API_Key_Body' | 'API_Key_Header' | 'API_Key_QS' | 'Bearer Token'
  type: "No Auth" | "apiKey" | "Bearer Token",
};

export type Action = {
  type: string,
  payload: jwtToken,
};

export const initialToken: jwtToken = {
  key: "",
  repeat: false,
  token: "",
  void: true,
  type: "No Auth",
};

/** Action Creators */
export const createAction = (payload: jwtToken) => ({
  type: TOKEN_CREATE,
  payload,
});
export const invalidAction = () => ({ type: TOKEN_INVALID });
/**
 * 获取action
 * @param {jwtToken} payload 老的值
 */
export const getAction = (payload: jwtToken) => ({ type: TOKEN_GET, payload });

/** Reducer */

/**
 *
 * @param {jwtToken} state 老的值
 * @param {Action} action 新的类型和值
 */
export const TokenReducer = (
  state: jwtToken = initialToken,
  action: Action
) => {
  switch (action.type) {
    case TOKEN_CREATE:
      return Object.assign({}, state, action.payload);
    case TOKEN_INVALID:
      return initialToken;
    default:
      return state;
  }
};
