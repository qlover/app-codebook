import React from "react";
import { Text, View, ImageBackground } from "react-native";
import Container from "./Container";
import { Button } from "react-native-paper";
class Boot extends Container {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1, justifyContent: "flex-end" }}
        source={require("../Source/container-boot.png")}
      >
        <View
          style={{
            bottom: 50,
            paddingHorizontal: 40,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            onPress={() => this.navigation().navigate("Auth", { key: "login" })}
            style={{ borderColor: "#eee", flex: 1, marginRight: 20 }}
            mode="contained"
          >
            登录
          </Button>
          <Button
            onPress={() =>
              this.navigation().navigate("Auth", { key: "register" })
            }
            style={{ borderColor: "#eee", flex: 1, marginLeft: 20 }}
            mode="outlined"
          >
            注册
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default Boot;
