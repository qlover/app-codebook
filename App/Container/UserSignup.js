import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import { signup } from "../Service/Http/UserLoginService";
import Container from "./Container";
import Toast from "../Service/Sys/Toast";
import { Button, TextInput, IconButton, Colors } from "react-native-paper";
import { createAction } from "../Redux/AuthRedux";
import { connect } from "react-redux";
import { trimAll } from "../Lib/Utils";

export class UserSignup extends Container {
  constructor(props) {
    super(props);

    this.state = {
      isSecureTextEntry: true,
      loading: false,
      username: "qlover",
      password: "qwer123",
    };
  }

  onToLogin() {
    this.navigation().replace("login");
  }

  onToggleSecureEntry() {
    this.setState({ isSecureTextEntry: !this.state.isSecureTextEntry });
  }

  _onRegister() {
    const { username, password } = this.state;
    this.setState({ loading: true });

    signup(username, password)
      .then((res) => {
        this.props.remember({ username, password });
        this.setState({ loading: false });
        new Toast().showText("注册成功");
        this.navigation().replace("login");
      })
      .catch((message) => {
        this.setState({ loading: false });
        new Toast().show({ message });
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
            dense={true}
            value={this.state.username}
            placeholder="请输入用户名"
            onChangeText={(username) => {
              this.setState({ username: trimAll(username) });
            }}
          />
          <View style={{ position: "relative", justifyContent: "center" }}>
            <TextInput
              style={{ zIndex: 1 }}
              mode="outlined"
              secureTextEntry={this.state.isSecureTextEntry}
              dense={true}
              value={this.state.password}
              placeholder="请输入密码"
              maxLength={32}
              onChangeText={(password) => {
                this.setState({ password: trimAll(password) });
              }}
            />
            <IconButton
              style={{
                position: "absolute",
                right: 0,
                zIndex: 2,
                bottom: 0,
                backgroundColor: "#eee",
              }}
              icon={this.state.isSecureTextEntry ? "eye-off" : "eye"}
              color={Colors.deepPurple800}
              size={20}
              onPress={() => this.onToggleSecureEntry()}
            />
          </View>
          <Button
            loading={this.state.loading}
            mode="contained"
            style={{ marginVertical: 10 }}
            onPress={() => this._onRegister()}
            labelStyle={{ fontSize: 16 }}
          >
            注 册
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  remember: (info) => dispatch(createAction(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
