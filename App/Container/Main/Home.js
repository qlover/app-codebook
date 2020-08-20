import React, { Component } from "react";
import { Text, View } from "react-native";
import TokenService from "../../Service/TokenService";

class Home extends Component {
  constructor(props) {
    super(props);
    TokenService.getLocalToken().then((token) =>
      console.log("token is", token)
    );
  }
  render() {
    return (
      <View>
        <Text> 首页 </Text>
      </View>
    );
  }
}

export default Home;
