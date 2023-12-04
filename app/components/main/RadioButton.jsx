import { View, Text, Pressable,TouchableOpacity } from "react-native";
import React from "react";

export default function RadioButton({ onChange, className, value,title }) {
  return (
    <View className={`flex flex-row items-center my-[2px] ${className}`}>
      <TouchableOpacity
        onPress={() => onChange && onChange((v) => !v)}
        className={` h-5 w-5 rounded-full overflow-hidden p-[1px] border border-gray-500`}
      >
        {value && <View className="bg-slate-600 w-ful h-full rounded-full" />}
      </TouchableOpacity>
      <Text className="ml-2">{title}</Text>
    </View>
  );
}
