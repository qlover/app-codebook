// @flow
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from "@react-native-community/async-storage";

// 根 reducer,整合了全部需要的 recuder
import rootReducer from "./rootReducer";

// 应用中间件
const middleware = applyMiddleware(thunk);
// 持久化配置
const persistConfig = {
  key: "fasting-root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  // 未持久化的状态树
  // const store = createStore(rootReducer, data, middleware)

  // 状态存储树
  const store = createStore(persistedReducer, middleware);

  // 持久化
  const persistor = persistStore(store);
  return { store, persistor };
};
