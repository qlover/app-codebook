import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import Count from "../../../Containers/HomeTab/Count";
import HeaderLeft from "../../../Components/Header/HeaderLeft";
import HeaderRight from "../../../Components/Header/HeaderRight";
import colors from "../../../Themes/Colors";

const Stack = createStackNavigator();

export default function CountStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.themeColor,
            elevation: 0,
          },
          headerLeft: HeaderLeft,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleAllowFontScaling: true,
          headerRight: HeaderRight,
        }}
        name="Count"
        component={Count}
      />
    </Stack.Navigator>
  );
}
