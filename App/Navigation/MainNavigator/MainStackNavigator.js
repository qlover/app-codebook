import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import Home from "../../Container/Main/Hometest";
import { Dict } from "../../Container/Main/Dict";

const Stack = createStackNavigator();

export default function LaunchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DcitInfo" component={Dict} />
    </Stack.Navigator>
  );
}
