import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getApi, url } from "../../../apis";

export default function Categories() {
  const [categories, setCategories] = useState();
  useEffect(() => {
    getApi("/category/getAll").then((res) => {
      setCategories(res.data.data);
    });
  }, []);
  return (
    <View>
      <Text className="text-lg mx-5 my-4">All Categories</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="w-[15]" />
        {categories?.map((category) => (
          <Cart key={category.id} data={category} />
        ))}
        <View className="w-[15]" />
        {!categories && (
          <View className="flex flex-row justify-center items-center w-full h-[80]">
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const Cart = ({ data }) => {
  return (
    <ImageBackground
      source={{
        uri: `${url}${data.icon}`,
      }}
      className="w-[80px] h-[80px] mx-[5] rounded-md overflow-hidden justify-end"
    >
      <View className=" items-center  bg-[#02020260] p-1">
        <Text numberOfLines={2} className="text-white font-extrabold text-xs">{data.name}</Text>
      </View>
    </ImageBackground>
  );
};
