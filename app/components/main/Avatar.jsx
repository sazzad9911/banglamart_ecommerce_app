import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function Avatar({ source, editable, style, onPress ,size}) {
  return (
    <View
      style={[
        {
          height: 60,
          width: 60,
          borderRadius: 30,
        },
        style,
      ]}
    >
      {source?.uri ? (
        <Image
          className="w-full h-full rounded-full"
          source={{ uri: source.uri }}
        />
      ) : (
        <FontAwesome name="user-circle-o" size={size?size:60} color="skyblue" />
      )}
      {editable && (
        <TouchableOpacity
          onPress={onPress}
          className="absolute bottom-0 right-[-6px] bg-gray-50 p-[2px] justify-center items-center"
        >
          <FontAwesome5 name="edit" size={18} color="blue" />
        </TouchableOpacity>
      )}
    </View>
  );
}
