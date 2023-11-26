import { View, Text, Pressable } from "react-native";
import React from "react";

export default function RadioButton({ onChange, className, value,title }) {
  return (
    <View className={`flex flex-row items-center my-[2px] ${className}`}>
      <Pressable
        onPress={() => onChange && onChange((v) => !v)}
        className={` h-4 w-4 rounded-full overflow-hidden p-[1px] border border-gray-500`}
      >
        {value && <View className="bg-slate-600 w-ful h-full rounded-full" />}
      </Pressable>
      <Text className="ml-2">{title}</Text>
    </View>
  );
}
