import React from "react";
import { connect } from "react-redux";

import {
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { login } from "../Service/UserLoginService";
import { createAction, invalidAction } from "../Redux/TokenRedux";
import getMsgByKey from "../Config/error";
import TokenService from "../Service/TokenService";
import Container from "./Container";

class UserLogin extends Container {
  constructor(props) {
    super(props);

    this.state = {
      username: "qlover",
      password: "qwer123",
    };
  }

  render() {
    return (
      <View>
        <Text style={{ textAlign: "center" }}> 登录 </Text>

        <View style={{ padding: 20, margin: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginVertical: 8,
            }}
            value={this.state.username}
            placeholder="请输入用户名"
            onChangeText={(username) => {
              this.setState({ username });
            }}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginVertical: 8,
            }}
            value={this.state.password}
            textContentType="newPassword"
            placeholder="请输入密码"
            onChangeText={(password) => {
              this.setState({ password });
            }}
          />
          <Text onPress={() => this.onToRegister()}>去注册</Text>
          <TouchableWithoutFeedback>
            <View style={{ marginVertical: 10 }}>
              <Button title="登录" onPress={() => this.onLogin()} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  onToRegister() {
    const { navigation } = this.props;
    navigation.replace("register");
  }

  onLogin() {
    const { username, password } = this.state;
    const { navigation } = this.props;

    login(username, password)
      .then((res) => {
        console.log("登录成功");
        const state = TokenService.setToken(res);
        navigation.replace("Main");
      })
      .catch((error) => {
        console.log(error);
        if (error.error) {
          console.log(getMsgByKey(error.error));
        } else {
          console.log("登录失败" + error);
        }
      });
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
