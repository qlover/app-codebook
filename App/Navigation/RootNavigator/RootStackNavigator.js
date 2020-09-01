import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LaunchStackNavigator from "../LaunchNavigator/LaunchStackNavigator";
import AuthStackNavigator from "../AuthNavigator/AuthStackNavigator";
import MainStackNavigator from "../MainNavigator/MainStackNavigator";
import TokenService from "../../Service/Local/TokenService";

const Stack = createStackNavigator();

export default function RootStackNavigator({ navigation }) {
  // 初始进入页
  const jwtToken = TokenService.getToken();
  const initialRouteName = TokenService.check(jwtToken) ? "Main" : "Launch";
  return (
    <Stack.Navigator headerMode="none" initialRouteName={initialRouteName}>
      <Stack.Screen name="Launch" component={LaunchStackNavigator} />
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="Main" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}
