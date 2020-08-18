import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// 子stack 导航
import HomeStackNavigator from "./HomeStackNavigator";
import CountStackNavigator from "./CountStackNavigator";
import MyStackNavigator from "./MyStackNavigator";
// 子 tab 页面
import Home from "../../../Containers/HomeTab/Home";
import Count from "../../../Containers/HomeTab/Count";
import My from "../../../Containers/HomeTab/My";
import HeaderLeft from "../../../Components/Header/HeaderLeft";
import HeaderRight from "../../../Components/Header/HeaderRight";

const BottomTab = createBottomTabNavigator();

/**
 * tab 导航加子 stack 导航
 */
export default class HomeTabSubStackNavigator extends React.Component {
  render() {
    return (
      <BottomTab.Navigator initialRouteName="My" tabBarOptions={{}}>
        <BottomTab.Screen name="Home" component={HomeStackNavigator} />
        <BottomTab.Screen name="Count" component={CountStackNavigator} />
        <BottomTab.Screen name="My" component={MyStackNavigator} />
      </BottomTab.Navigator>
    );
  }
}

const Tab = createBottomTabNavigator();

/**
 * 只有tab 导航,子元素就三个tab页
 */
export class HomeTabNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="My">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Count" component={Count} />
        <Tab.Screen name="My" component={My} />
      </Tab.Navigator>
    );
  }
}
