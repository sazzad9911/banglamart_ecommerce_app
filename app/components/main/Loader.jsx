import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loader() {
  return (
    <View className="absolute z-50 flex-1 justify-center items-center w-full h-full bg-[#0000004d]">
      <ActivityIndicator color={"blue"} size={"small"} />
    </View>
  );
}
