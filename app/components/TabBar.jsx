import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TabBar(props) {
  const index = props.state.index;
 // console.log(props.state.index);
  return (
    <View
      style={{
        backgroundColor: "#f2f2f2",
      }}
    >
      <View className="flex flex-row px-4 py-2 justify-between rounded-tl-xl rounded-tr-xl bg-white">
        <Link href={"/user"}>
          <View className="items-center">
            <Entypo
              name="home"
              size={24}
              color={index === 0 ? "#00A2E9" : "gray"}
            />
            <Text className="text-gray-600 text-xs">Home</Text>
          </View>
        </Link>
        <Link href={"/user/myCart"} className="items-center">
          <View className="items-center">
            <FontAwesome5
              name="cart-plus"
              size={24}
              color={index === 1 ? "#00A2E9" : "gray"}
            />
            <Text className="text-gray-600 text-xs">My Cart</Text>
          </View>
        </Link>
        <Link href={"/user/notification"}>
          <View className="items-center">
            <Ionicons
              name="notifications"
              size={24}
              color={index === 2 ? "#00A2E9" : "gray"}
            />
            <Text className="text-gray-600 text-xs">Notification</Text>
          </View>
        </Link>
        <Link href={"/user/messages"} className="items-center">
          <View className="items-center">
            <MaterialCommunityIcons
              name="message"
              size={24}
              color={index === 3 ? "#00A2E9" : "gray"}
            />
            <Text className="text-gray-600 text-xs">Messages</Text>
          </View>
        </Link>
        <Link href={"/user/profile"} className="items-center">
          <View className="items-center">
            <FontAwesome
              name="user-circle-o"
              size={24}
              color={index === 4 ? "#00A2E9" : "gray"}
            />
            <Text className="text-gray-600 text-xs">Profile</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}
