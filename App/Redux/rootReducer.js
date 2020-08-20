// 根 reducer
// 对所有的 reducer 做整合
import { combineReducers } from "redux";
import { TokenReducer } from './TokenRedux'
export default combineReducers({
  //every modules reducer should be define here
  TokenReducer
});
