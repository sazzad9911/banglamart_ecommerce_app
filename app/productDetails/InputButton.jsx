import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

export default function InputButton({ value, onChange, onPress, style }) {
  return (
    <View
      style={style}
      className="flex flex-row items-center border my-2 border-gray-400 rounded-md pl-2 justify-between"
    >
      <TextInput
        onChangeText={onChange}
        value={value}
        className=" flex-1"
        placeholder="Type here..."
      />
      <TouchableOpacity
        onPress={onPress}
        className="bg-sky-500 h-[36] w-[100] justify-center items-center"
      >
        <Text className="text-white">Apply</Text>
      </TouchableOpacity>
    </View>
  );
}
