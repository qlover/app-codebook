import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import Boot from "../../Container/Boot";
const Stack = createStackNavigator();
export default function LaunchStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="boot" component={Boot} />
    </Stack.Navigator>
  );
}
