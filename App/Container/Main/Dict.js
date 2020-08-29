import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { Dict as DictPlaceholder } from "../../Config/Lang";
import { keys, pick } from "lodash";
import DictService, { _DictEntity } from "../../Service/Http/DictService";
import Container from "../Container";

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

    this.state = { dict };
    this.service = new DictService();
  }

  onSaveDict() {
    const promise = isUpdate
      ? this.service.updateDict(this.state.dict)
      : this.service.addDict(this.state.dict);
    return promise
      .then((res) => {
        console.log("保存成功");
        this.navigation().pop();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderDictInput() {
    return keys(pick(this.state.dict, Object.keys(_DictEntity))).map((_key) => (
      <TextInput
        placeholder={
          DictPlaceholder[_key] ? DictPlaceholder[_key] : "请输入文本"
        }
        key={_key}
        style={styles.input}
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
        <TouchableWithoutFeedback>
          <View style={{ marginVertical: 10 }}>
            <Button title="保 存" onPress={() => this.onSaveDict()} />
          </View>
        </TouchableWithoutFeedback>
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
