import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router, useFocusEffect } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { getApi, url } from "../../apis";
import { SimpleLineIcons } from "@expo/vector-icons";
import { VStack } from "native-base";
import Avatar from "../components/main/Avatar";
import deliverData, { storeDeliver } from "../../reducers/dataDeliver";

export default function Messages() {
  const user = useSelector((s) => s.user);
  const [data, setData] = useState();
  const dispatch=useDispatch()

  useFocusEffect(() => {
   
    if(!user){
      return router.push("/login");
    }
    getApi("/message/get", user.token).then((response) => {
      setData(response.data.data);
      
    });
  });

  if (!data) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <VStack space={3}>
        <View />
        {data?.map((d, i) => (
          <Cart
            onPress={() => {
              dispatch(storeDeliver(d.receiver))
              router.push({
                pathname: "/chat_screen",
                params: {
                  id: d.id,
                },
              });
            }}
            key={i}
            data={d}
          />
        ))}
        <View />
        {data?.length == 0 ? (
          <View className="flex-1 items-center justify-center h-[60vh]">
            <SimpleLineIcons name="info" size={24} color="black" />
            <Text className="my-2 font-bold">No Message</Text>
          </View>
        ) : null}
      </VStack>
    </ScrollView>
  );
}
const Cart = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between mx-5 bg-white px-2 py-2 rounded-md"
    >
      <View className="flex flex-row items-center flex-1 mr-2">
        <Avatar
          source={{ uri: `${url}${data.receiver.image}` }}
          size={40}
          style={{
            height: 40,
            width: 40,
          }}
          editable={false}
        />
        <View className="ml-2 ">
          <Text className="font-medium">{data.receiver.name}</Text>
          <Text className="text-xs">{data.messages[0]?.message}</Text>
          <Text className="text-xs text-gray-500">
            {new Date(data.date).toDateString()}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-xs font-medium">On Product</Text>
        <Image
          className="w-8 h-8"
          source={{ uri: `${url}${data.product.thumbnail}` }}
        />
      </View>
    </TouchableOpacity>
  );
};
