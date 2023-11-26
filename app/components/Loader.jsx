import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loader() {
  return (
    <View className=" justify-center items-center flex-1">
      <ActivityIndicator size={'large'} color={"blue"} />
      <Text className="mt-2">Loading...</Text>
    </View>
  );
}
