import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function Loader() {
  const loader=useSelector(s=>s.loader)
  if(!loader){
    return null
  }
  return (
    <View className="absolute z-50 flex-1 justify-center items-center w-full h-full bg-[#0000004d]">
      <ActivityIndicator color={"blue"} size={"small"} />
    </View>
  );
}
