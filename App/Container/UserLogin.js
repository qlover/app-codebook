import React, { Component } from "react";
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

class UserLogin extends Component {
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
    const { username, password } = this.state;
    const { createToken } = this.props;
    login(username, password)
      .then((res) => {
        console.log("登录成功", res);
        createToken(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.TokenReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  invaliToken: () => dispatch(invalidAction()),
  createToken: (payload) => dispatch(createAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
