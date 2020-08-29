import React from "react";
import { Text, View } from "react-native";
import TokenService from "../Service/Http/TokenService";
import Container from "./Container";
class Boot extends Container {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 查检登录状态
    const jwtToken = TokenService.getToken();
    if (!TokenService.check(jwtToken)) {
      setTimeout(() => {
        this.navigation().replace("Auth");
      }, 4000);
      return;
    }

    this.navigation().replace("Main");
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
