import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

const Stack = createStackNavigator();

export default function LaunchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={() => (
          <Text style={{ textAlign: "center", backgroundColor: "red" }}>
            首页
          </Text>
        )}
      />
    </Stack.Navigator>
  );
}
