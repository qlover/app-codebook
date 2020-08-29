import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./App/Redux/createStrore";
import { PersistGate } from "redux-persist/integration/react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import Root from "./App/Navigation/Root";
const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Root />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
