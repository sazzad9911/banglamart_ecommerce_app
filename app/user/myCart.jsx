import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, router, useFocusEffect } from "expo-router";
import { useState } from "react";
import { getApi, putApi } from "../../apis";
import { VStack } from "native-base";
import Loader from "../components/Loader";
import { SimpleLineIcons } from "@expo/vector-icons";
import MyNewCart from "../components/products/MyCart";

export default function MyCart() {
  const user = useSelector((s) => s.user);
  const [data, setData] = useState();

  useFocusEffect(() => {
    if (!user) {
      return router.push("/login");
    }
    getApi("/cart/get", user.token).then((response) => {
      setData(response.data.data);
      //console.log(response.data.data);
    });
  });
  
  return (
    <ScrollView className="px-5">
      <VStack space={3} alignItems="center">
        <View />
        {data?.map((data, i) => (
          <MyNewCart data={data} key={i} />
        ))}
        {data?.length == 0 ? (
          <View className="flex-1 items-center justify-center h-[60vh]">
            <SimpleLineIcons name="info" size={24} color="black" />
            <Text className="my-2 font-bold">No Order</Text>
          </View>
        ) : null}
        {!data && (
          <View className="my-4 flex-1  h-[60vh]">
            <Loader />
          </View>
        )}
        <View />
      </VStack>
    </ScrollView>
  );
}
