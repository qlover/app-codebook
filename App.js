import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./App/Redux/createStrore";
import { PersistGate } from "redux-persist/integration/react";

import Root from "./App/Navigation/Root";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
