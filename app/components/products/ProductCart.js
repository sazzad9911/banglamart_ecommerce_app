import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { url } from "../../../apis";
import rm from "../../../assets/rm.png";
import del from "../../../assets/del.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProductCart({ data, offers, style }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/productDetails/[id]",
          params: { id: data.id },
        })
      }
    >
      <ImageBackground
        style={style}
        source={{ uri: `${url}${data.thumbnail}` }}
        className="mx-[5]  rounded-md overflow-hidden w-[150px] h-[200px] justify-end"
      >
        <ImageBackground
          className="w-[50] h-[50] absolute top-0 left-0 justify-center items-center overflow-hidden"
          source={rm}
        >
          <Text className="text-xs font-extrabold text-white">
            {data.offer}
            {data.percentage ? "%" : "৳"}
          </Text>
        </ImageBackground>
        <ImageBackground
          source={del}
          className="flex w-[40] h-[25] flex-row  absolute top-[6] right-[6] overflow-hidden"
        >
          <Text className="text-[10px] font-extrabold text-white ml-[2] mt-[2]">
            {data?.deliveryCharge}৳
          </Text>
        </ImageBackground>
        <View className=" bg-[#02020260] p-1">
          <View className="w-full flex flex-row">
            <Text className="text-sm line-through text-white">{data.price}৳</Text>
            <Text className="text-sm font-bold text-red-600 ml-2">
              {data?.percentage
                ? (data?.price - (data?.price * data?.offer) / 100).toFixed(0)
                : data?.price - data.offer}
              ৳
            </Text>
          </View>
          <Text numberOfLines={2} className="text-white text-xs">
            {data?.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
