import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LaunchStackNavigator from "../LaunchNavigator/LaunchStackNavigator";
import AuthStackNavigator from "../AuthNavigator/AuthStackNavigator";
import MainStackNavigator from "../MainNavigator/MainStackNavigator";

const Stack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Launch">
      <Stack.Screen name="Launch" component={LaunchStackNavigator} />
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="Main" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}
