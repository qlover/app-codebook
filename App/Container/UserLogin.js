import React from "react";
import { connect } from "react-redux";

import { View, ImageBackground, Image, Text } from "react-native";
import { login } from "../Service/Http/UserLoginService";
import getMsgByKey from "../Config/error";
import TokenService from "../Service/Local/TokenService";
import Container from "./Container";
import { Button, TextInput, Checkbox } from "react-native-paper";
import Toast from "../Service/Sys/Toast";
import { createAction } from "../Redux/AuthRedux";

class UserLogin extends Container {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      loading: false,
      ...props.auth,
    };
  }

  onToRegister() {
    this.navigation().navigate("register");
  }

  onRemember() {
    const { username, password } = this.state;
    this.props.remember({ username, password });
  }

  onLogin() {
    const { username, password } = this.state;
    this.setState({ loading: true });
    login(username, password)
      .then((res) => {
        this.setState({ loading: false });
        if (!res.token && !res.void) {
          return Promise.reject("auth.token.fail");
        }
        if (this.state.remember) {
          this.onRemember();
        }

        new Toast().showText("登录成功");
        const state = TokenService.setToken(res);
        this.navigation().replace("Main");
      })
      .catch((error) => {
        this.setState({ loading: false });
        if (error.error) {
          new Toast().showText(getMsgByKey(error.error));
        } else {
          new Toast().showText("登录失败" + error);
        }
      });
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../Source/container-boot.png")}
      >
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={require("../Source/container-login-logo.png")} />
        </View>
        <View style={{ flex: 3, padding: 20, margin: 20 }}>
          <TextInput
            mode="outlined"
            clearButtonMode="never"
            style={{ height: 45 }}
            value={this.state.username}
            placeholder="请输入用户名"
            onChangeText={(username) => {
              this.setState({ username });
            }}
          />
          <TextInput
            mode="outlined"
            secureTextEntry={true}
            style={{ height: 45 }}
            value={this.state.password}
            placeholder="请输入密码"
            onChangeText={(password) => {
              this.setState({ password });
            }}
          />

          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                color="#6200ee"
                status={this.state.remember ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ remember: !this.state.remember });
                }}
              />
              <Text>记住密码</Text>
            </View>
            <View>
              <Text onPress={() => this.onToRegister()}>去注册</Text>
            </View>
          </View>
          <Button
            loading={this.state.loading}
            mode="contained"
            style={{ marginVertical: 10 }}
            onPress={() => this.onLogin()}
            labelStyle={{ fontSize: 16 }}
          >
            登 录
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.AuthReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  remember: (info) => dispatch(createAction(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
