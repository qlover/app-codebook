import React from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  RefreshControl,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { Portal, FAB, Provider } from "react-native-paper";

import { Sort, Paginate } from "../../Contracts/Types/Service";
import DictService, { DictEntity } from "../../Service/Http/DictService";
import TokenService from "../Service/Local/TokenService";
import Container from "../Container";

class Home extends Container {
  constructor(props) {
    super(props);

    this.service = new DictService();

    this.state = {
      dictList: [],
      page: {
        page: 1,
        limit: 6,
      },
      sort: {
        sort: "id",
        sortBy: 1,
      },
      refreshing: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    // 正在加载
    if (!this.state.refreshing) {
      this.setState({ refreshing: true });
    }

    this.service
      .getList(this.state.page, this.state.sort)
      .then(({ dicts }) =>
        this.setState({ dictList: dicts.data, refreshing: false })
      )
      .catch((err) => console.log("获取失败:" + (err.error ? err.error : err)));
  }

  onDeleteDict(ids: Array<number>) {
    this.service
      .deleteDict(ids)
      .then((res) => {
        console.log("删除成功");
        this.setState({
          dictList: this.state.dictList.filter(
            (item) => !ids.includes(item.id)
          ),
        });
      })
      .catch((err) => console.log(err));
  }

  onLogout() {
    const { navigation } = this.props;
    TokenService.invaldToken();
    navigation.reset({
      routes: [{ name: "Auth" }],
    });
  }

  onDictClick(params: DictEntity) {
    const { navigation } = this.props;
    navigation.navigate({
      name: "DcitInfo",
      params,
    });
  }

  renderDict = ({ item, index, separators }) => (
    // <TouchableOpacity onPress={() => this.onTouchItem()}>
    <TouchableWithoutFeedback>
      <View style={{ margin: 10, borderWidth: 1, borderColor: "#0ff" }}>
        <Text>id: {item.id}</Text>
        <Text>title: {item.title}</Text>
        <Text>website: {item.website}</Text>
        <Text>username: {item.username}</Text>
        <Text>password: {item.password}</Text>
        <Text>phone: {item.phone}</Text>
        <Text>email: {item.email}</Text>

        <Ionicons
          onPress={() => this.onDeleteDict([item.id])}
          style={{
            position: "absolute",
            right: 15,
            top: 15,
            color: "#0ee",
            fontSize: 20,
          }}
          name="delete"
        />
      </View>
    </TouchableWithoutFeedback>
  );

  renderFastingItemKey = (item) => item.title;

  renderPullLoading = () => (
    <View style={{ margin: 15 }}>
      <Text style={{ fontSize: 12, color: "#888", textAlign: "center" }}>
        正在加载中...
      </Text>
    </View>
  );

  render() {
    return (
      <Provider>
        <TouchableWithoutFeedback>
          <View style={{ marginVertical: 10 }}>
            <Button title="添加" onPress={() => this.onDictClick()} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={{ marginVertical: 10 }}>
            <Button title="退出" onPress={() => this.onLogout()} />
          </View>
        </TouchableWithoutFeedback>

        <FlatList
          data={this.state.dictList}
          renderItem={this.renderDict}
          keyExtractor={this.renderFastingItemKey}
          ListEmptyComponent={() => <Text>暂无数据</Text>}
          refreshControl={
            <RefreshControl
              enabled={true}
              title={"加载中..."}
              colors={["green"]} //此颜色无效
              tintColor={"orange"}
              titleColor={"red"} //只有ios有效
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        />

        <Portal>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => this.onDictClick()}
          />
        </Portal>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 25,
    bottom: 50,
  },
});

export default Home;
