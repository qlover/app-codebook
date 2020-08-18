import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./RootNavigator/RootStackNavigator";
import { StatusBar } from "react-native";

export default function Root() {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStackNavigator />
    </NavigationContainer>
  );
}
