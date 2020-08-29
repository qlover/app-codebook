/** TYPE */
export const AUTH_SET = "AUTH_SET";
export const AUTH_CLEAR = "AUTH_CLEAR";

export type Auth = {
  username: string,
  password: string,
};

export type Action = {
  type: string,
  info: Auth,
};

export const initAuth: Auth = {
  username: "",
  password: "",
};

/** Action Creators */
export const createAction = (info: Auth) => ({
  type: AUTH_SET,
  info,
});
export const clearAction = () => ({ type: AUTH_CLEAR });

/** Reducer */

/**
 *
 * @param {Auth} state 老的值
 * @param {Action} action 新的类型和值
 */
export const AuthReducer = (state: Auth = initAuth, action: Action) => {
  switch (action.type) {
    case AUTH_SET:
      return Object.assign({}, state, action.info);
    case AUTH_CLEAR:
      return initAuth;
    default:
      return state;
  }
};
