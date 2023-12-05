import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { router, useFocusEffect } from "expo-router";
import { Stack } from "native-base";
import { getApi } from "../../apis";
import { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { hideLoader, showLoader } from "../../reducers/loader";
import Loader from "../components/Loader";
import { StatusBar } from "expo-status-bar";

export default function Notification() {
  const user = useSelector((s) => s.user);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useFocusEffect(() => {
    if (!user) {
      return router.push("/login");
    }

    getApi("/notification/read", user.token)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((e) => {
        console.error(e.response.data.message);
      });
  });
  if(!data){
    return <Loader/>
  }
  return (
    <ScrollView>
      <StatusBar style="dark" />
      <Stack space={3}>
        <View/>
        {data?.map((d, i) => (
          <Card data={d} key={i} />
        ))}
        <View/>
        {data?.length == 0 ? (
          <View className="flex-1 items-center justify-center h-[60vh]">
            <SimpleLineIcons name="info" size={24} color="black" />
            <Text className="my-2 font-bold">No Notification</Text>
          </View>
        ) : null}
      </Stack>
    </ScrollView>
  );
}
const Card = ({ data }) => {
  return (
    <View className="mx-5 bg-white px-2 py-1 rounded-md">
      <Text className="font-semibold">{data.title}</Text>
      <Text>{data.message}</Text>
      <Text className="text-gray-400">{new Date(data.date).toDateString()}</Text>
    </View>
  );
};
