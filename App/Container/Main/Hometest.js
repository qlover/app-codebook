import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { Provider, Portal, FAB } from "react-native-paper";
import { throttle } from "lodash";

import DictService, {
  DictEntity,
  _DictEntity,
} from "../../Service/Http/DictService";
import TokenService from "../../Service/Http/TokenService";
import Container from "../Container";
import Toast from "../../Service/Sys/Toast";

let page = {
  page: 1,
  limit: 6,
};

let loadOver = false;

export default class Home extends Container {
  constructor(props) {
    super(props);
    this.service = new DictService();
    this.state = {
      isLoading: false,
      isRefreshing: false,
      dictlist: [],
    };

    this.onLoading = throttle(this._onLoading, 1500);
  }

  componentDidMount() {
    this._onLoading(true);
  }

  changeStatus(isLoading = false, isRefreshing = false) {
    this.changeState({ isLoading, isRefreshing });
  }

  /**
   * 增加页数或重置页数
   *
   * @param {boolean} rest 是否重置页数
   * @param {number} inc 每次增加的页数,默认1
   */
  incrementPage(rest: Boolean = false, inc: number = 1) {
    return (page.page = rest ? 1 : page.page + Math.max(0, inc));
  }

  onDictClick(params: DictEntity = _DictEntity) {
    const { navigation } = this.props;
    navigation.navigate({
      name: "DcitInfo",
      params,
    });
  }

  _onLoading(isRefreshing) {
    if (isRefreshing) {
      // 刷新
      loadOver = false;
      this.setState({ isRefreshing });
    } else {
      // 加载
      if (loadOver) {
        return 0;
      }
      this.setState({ isLoading: true });
    }
    console.log("loading..");

    this.incrementPage(isRefreshing);

    const state = { isRefreshing: false, isLoading: false };
    this.service
      .getList(page, { sort: "id", sortBy: 1 })
      .then((res) => {
        const { data } = res.dicts;
        // 放置是否加载完毕
        loadOver = !data || data.length < page.limit;
        const dictlist = isRefreshing ? data : this.state.dictlist.concat(data);
        this.setState({ ...state, dictlist });
      })
      .catch((message) => {
        this.setState(state);
        // new Toast().show({ message });
      });
  }

  onLogout() {
    const { navigation } = this.props;
    TokenService.invaldToken();
    navigation.reset({
      routes: [{ name: "Auth" }],
    });
  }

  renderPullLoading = () => {
    if (loadOver) {
      return (
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 12, color: "#888", textAlign: "center" }}>
            没有更多了
          </Text>
        </View>
      );
    }
    if (this.state.isLoading) {
      return (
        <View style={{ margin: 15 }}>
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, { height: 20 }]}
            size="small"
          />
        </View>
      );
    }
    return null;
  };

  renderListHeader = () => {
    return (
      <View>
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
      </View>
    );
  };

  renderDict = ({ item, index, separators }) => (
    <TouchableWithoutFeedback onPress={() => this.onDictClick(item)}>
      <View style={{ margin: 10, borderWidth: 1, borderColor: "#0ff" }}>
        <Text>id: {item.id}</Text>
        <Text>title: {item.title}</Text>
        <Text>website: {item.website}</Text>
        <Text>username: {item.username}</Text>
        <Text>password: {item.password}</Text>
        <Text>phone: {item.phone}</Text>
        <Text>email: {item.email}</Text>

        <Ionicons
          // onPress={() => this.onDeleteDict([item.id])}
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

  render() {
    return (
      <Provider>
        <FlatList
          ListHeaderComponent={this.renderListHeader}
          data={this.state.dictlist}
          renderItem={this.renderDict}
          refreshControl={
            <RefreshControl
              colors={["red"]} //此颜色无效
              tintColor={"orange"}
              titleColor={"red"} //只有ios有效
              refreshing={this.state.isRefreshing}
              onRefresh={() => {
                this.onLoading(true);
              }}
            />
          }
          ListFooterComponent={() => this.renderPullLoading()} //上拉加载更多视图
          onEndReached={() => this.onLoading()} // TODO:待解决滑动频繁调用 loading
          onEndReachedThreshold={0.5} // 这个属性的意思是 当滑动到距离列表内容底部不足 0.1*列表内容高度时触发onEndReached函数 为啥要加这个属性 因为不加的话滑动一点点就会立即触发onReached函数，看不到菊花加载中
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  item: {
    backgroundColor: "#168",
    height: 200,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: "center",
    //justifyContetnt:'center',
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  indicatorContainer: {
    alignItems: "center",
  },
  indicator: {
    color: "red",
    margin: 10,
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 50,
  },
});
