import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { signup } from "../Service/UserLoginService";

export default class UserSignup extends Component {
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
        <Text style={{ textAlign: "center" }}> 注册 </Text>

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
            onChangeText={(text) => {
              this.setState({ username: text });
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
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <Text onPress={() => this.onToLogin()}>去登录</Text>
          <TouchableWithoutFeedback>
            <View style={{ marginVertical: 10 }}>
              <Button title="注 册" onPress={() => this.onRegister()} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  onToLogin() {
    const { navigation } = this.props;
    navigation.replace("login");
  }

  onRegister() {
    signup(this.state.username, this.state.password)
      .then((res) => console.log("注册成功", res))
      .catch((error) => console.log(error));
  }
}
