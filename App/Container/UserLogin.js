import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { login } from "../Service/UserLoginService";

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
          <TouchableWithoutFeedback>
            <View style={{ marginVertical: 10 }}>
              <Button title="登录" onPress={() => this.onLogin()} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  onLogin() {
    login(this.state.username, this.state.password)
      .then((res) => console.log("登录成功", res))
      .catch((error) => console.log(error));
  }
}
