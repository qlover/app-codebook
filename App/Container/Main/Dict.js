import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dict as DictPlaceholder } from "../../Config/Lang";
import { keys, pick } from "lodash";
import DictService, { _DictEntity } from "../../Service/Http/DictService";
import Container from "../Container";
import Toast from "../../Service/Sys/Toast";
import { TextInput, Button } from "react-native-paper";

/**
 * 是保存还是修改
 *
 * @private
 * @property {Boolean} isUpdate true: 修改 false: 增加
 */
let isUpdate: Boolean;

export class Dict extends Container {
  constructor(props) {
    super(props);
    const { route } = this.props;
    // 用ID判断是修改还是增加
    isUpdate = route.params && route.params.id && route.params.id > 0;
    const dict = isUpdate ? route.params : _DictEntity;

    this.state = { dict, isSaving: false };
    this.service = new DictService();
  }

  onSaveDict() {
    if (this.state.isSaving) {
      new Toast().show({ message: "点击频繁" });
      return;
    }
    this.setState({ isSaving: true });
    const promise = isUpdate
      ? this.service.updateDict(this.state.dict)
      : this.service.addDict(this.state.dict);
    return promise
      .then((res) => {
        this.navigation().pop();
        new Toast().show({ message: "保存成功" });
      })
      .catch((message) => {
        this.setState({ isSaving: false });
        new Toast().show({ message });
      });
  }

  renderDictInput() {
    return keys(pick(this.state.dict, Object.keys(_DictEntity))).map((_key) => (
      <TextInput
        mode="outlined"
        dense={true}
        placeholder={
          DictPlaceholder[_key] ? DictPlaceholder[_key] : "请输入文本"
        }
        key={_key}
        value={this.state.dict[_key]}
        onChangeText={(text) => {
          this.setState({ dict: { ...this.state.dict, [_key]: text } });
        }}
      />
    ));
  }

  render() {
    return (
      <View style={{ padding: 20 }}>
        {this.renderDictInput()}
        <Button
          loading={this.state.isSaving}
          style={{ marginTop: 20 }}
          mode="contained"
          onPress={() => this.onSaveDict()}
        >
          保存
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 8,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dict);
