import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

const Stack = createStackNavigator();

export default function OtherStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Other1" component={() => <Text>Other1</Text>} />
      <Stack.Screen name="Other2" component={() => <Text>Other2</Text>} />
    </Stack.Navigator>
  );
}
