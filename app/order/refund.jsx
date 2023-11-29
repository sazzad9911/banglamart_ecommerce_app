import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import { VStack } from "native-base";
import ProductCart from "../components/products/ProductCart";
import { useState } from "react";
import Loader from "../components/Loader";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { getApi } from "../../apis";
import OrderCart from "../components/products/OrderCart";

export default function Refund() {
  const [data, setData] = useState();
  const user = useSelector((s) => s.user);
  useFocusEffect(() => {
    getApi("/order/user", user?.token)
      .then((res) => {
        setData(res.data.data.filter((d) => d.status === "REFUNDED"));
      })
      .catch((e) => {
        console.error(e.message);
      });
  });
  return (
    <ScrollView className="px-5">
      <VStack space={3} alignItems="center">
        <View />
        {data ? (
          data?.map((data, i) => <OrderCart data={data} key={i} />)
        ) : (
          <View className="my-4 flex-1  h-[60vh]">
            <Loader />
          </View>
        )}
        {data?.length == 0 ? (
          <View className="flex-1 items-center justify-center h-[60vh]">
            <SimpleLineIcons name="info" size={24} color="black" />
            <Text className="my-2 font-bold">No Order</Text>
          </View>
        ) : null}
        <View />
      </VStack>
    </ScrollView>
  );
}
