import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

const Stack = createStackNavigator();

export default function ModalStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Modal1" component={() => <Text>Modal1</Text>} />
      <Stack.Screen name="Modal2" component={() => <Text>Modal2</Text>} />
    </Stack.Navigator>
  );
}
