import React, { Component } from "react";

/**
 * 所有容器，所有页面的基类
 */
export default class Container extends Component {
  static screen: Container;
  constructor(props) {
    super(props);
    // 记录当前页
    Container.screen = this;
  }

  changeState(state) {
    this.setState(state);
  }

  navigation() {
    return this.props.navigation;
  }
}
