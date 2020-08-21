// 根 reducer
// 对所有的 reducer 做整合
import { combineReducers } from "redux";
import { TokenReducer } from './TokenRedux'
export default combineReducers({
  //every modules reducer should be define here
  // TODO: TOKEN 的 reducer 和其它的 reducer 不同是单独的本地 Local，所以到时候应该单独华分出去
  TokenReducer
});
