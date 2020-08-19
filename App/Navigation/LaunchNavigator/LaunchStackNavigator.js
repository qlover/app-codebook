import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

const Stack = createStackNavigator();

export default function LaunchStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="boot"
        component={() => (
          <Text style={{ textAlign: "center", backgroundColor: "red" }}>
            启动页
          </Text>
        )}
      />
    </Stack.Navigator>
  );
}
