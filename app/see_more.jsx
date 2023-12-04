import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import ProductCart from "./components/products/ProductCart";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

export default function See_more() {
    const {data}=useLocalSearchParams()
    const values=null;
    console.log(data);
    //console.log(JSON.parse(data)); 
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View className="flex flex-row flex-wrap px-5 py-2 justify-center bg-gray-100">
          {values?.map((data, i) => (
            <ProductCart
              style={{
                marginVertical: 5,
                width: Dimensions.get("window").width / 2 - 30,
                marginHorizontal: 5,
              }}
              data={data}
              key={i}
            />
          ))}
          {values?.length == 0 ? (
            <View className="flex-1 items-center justify-center h-[60vh]">
              <SimpleLineIcons name="info" size={24} color="black" />
              <Text className="my-2 font-bold">No Product</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
