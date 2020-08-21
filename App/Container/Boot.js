import React, { Component } from "react";
import { Text, View } from "react-native";
import TokenService from '../Service/TokenService'
class Boot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { navigation } = this.props;

    // 查检登录状态
    const jwtToken = TokenService.getToken()
    if (!TokenService.check(jwtToken)) {
      navigation.replace("Auth");
      return 
    }

    navigation.replace("Main");
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
