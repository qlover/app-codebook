import React, { Component } from "react";
import { Text, View } from "react-native";
import TokenService from "../Service/TokenService";
class Boot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { navigation } = this.props;

    // 查检登录状态
    const jwtToken = TokenService.getToken();
    if (!TokenService.check(jwtToken)) {
      setTimeout(() => {
        navigation.replace("Auth");
      }, 4000);
      return;
    }

    navigation.replace("Main");
    // setTimeout(() => {
    //   navigation.replace("Main");
    // }, 4000);
  }

  render() {
    return (
      <View>
        <Text style={{ textAlign: "center", backgroundColor: "red" }}>
          启动页
        </Text>
      </View>
    );
  }
}

export default Boot;
