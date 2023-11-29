import {
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { Box, StatusBar, useColorModeValue } from "native-base";
import Index from "./order";
import Accepted from "./order/accepted";
import Cancelled from "./order/cancelled";
import Completed from "./order/completed";
import Courier from "./order/courier";
import Refund from "./order/refund";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  first: Index,
  second: Accepted,
  third: Cancelled,
  fourth: Completed,
  fifth: Courier,
  sixth: Refund,
});

export default function Order_list() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "PENDING",
    },
    {
      key: "second",
      title: "ACCEPTED",
    },
    {
      key: "third",
      title: "CANCELLED",
    },
    {
      key: "fourth",
      title: "COMPLETED",
    },
    {
      key: "fifth",
      title: "COURIER",
    },
    {
      key: "sixth",
      title: "REFUND",
    },
  ]);
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <TabBar
        contentContainerStyle={{}}
        labelStyle={{
          color: "#000",
        }}
        indicatorContainerStyle={{
          backgroundColor: "#fff",
        }}
        activeColor="#067AD5"
        indicatorStyle={{
          backgroundColor: "#067AD5",
        }}
        {...props}
        scrollEnabled={true}
      />
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        marginTop: StatusBar.currentHeight,
      }}
    />
  );
}
