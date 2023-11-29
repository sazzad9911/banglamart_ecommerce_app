import { View, Text, Image } from "react-native";
import React from "react";
import { url } from "../../../apis";

export default function OrderCart({ data }) {
  return (
    <View className="flex flex-row flex-1 bg-white rounded-md overflow-hidden">
      <Image
        className="w-[90px] h-full"
        source={{ uri: `${url}${data.product.thumbnail}` }}
      />
      <View className="flex-1 mx-2 my-1">
        <Text className="flex-1 font-semibold">
          {data.product.title} ({data.quantity})
        </Text>
        <View className="flex flex-row">
          <Text>Total: {data.offerPrice || data.totalAmount}৳</Text>
          <Text
            style={{ color: data.paid ? "green" : "red" }}
            className="ml-2 font-medium"
          >
            {data.paid ? "Paid" : "Due"}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          {data?.colors && (
            <View className="flex flex-row items-center">
              <Text className="font-medium text-xs">Color</Text>
              <View
                style={{
                  backgroundColor: data?.colors?.value,
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  marginLeft: 5,
                }}
              />
            </View>
          )}
          {data.sizes && (
            <Text className="font-medium text-xs ml-1">
              Size: {data.sizes.label}
            </Text>
          )}
          {data.specifications && (
            <Text className="font-medium text-xs ml-1">
              Quot: {data.specifications.label}
            </Text>
          )}
        </View>
        <Text className="text-xs text-gray-500">
          {new Date(data.date).toDateString()}
        </Text>
      </View>
    </View>
  );
}
