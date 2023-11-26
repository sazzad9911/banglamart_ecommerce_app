import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { getApi } from "../../../apis";
import ProductCart from "../products/ProductCart";
import { AntDesign } from "@expo/vector-icons";

export default function BargainingProduct() {
  const [products, setProducts] = useState();

  useEffect(() => {
    getApi(`/product/get-bargaining`).then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  return (
    <View>
      <View className="mx-5 flex flex-row justify-between  my-4 mb-2">
        <Text className="text-lg ">Bargaining Product</Text>
        <AntDesign name="rightcircle" size={24} color="black" />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="w-[15]" />
        {products?.slice(0, 10).map((category) => (
          <ProductCart key={category.id} data={category} />
        ))}
        <View className="w-[15]" />
        {!products && (
          <View className="flex flex-row justify-center items-center w-full h-[80]">
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
