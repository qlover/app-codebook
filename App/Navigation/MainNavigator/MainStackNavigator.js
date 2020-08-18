import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={() => <Text>首页</Text>} />
    </Stack.Navigator>
  );
}
