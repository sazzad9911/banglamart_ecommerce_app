import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Head(props) {
  const inset = useSafeAreaInsets();

  return (
    <View
      className={`px-5 bg-white shadow-md h-[70px] justify-center  items-center flex flex-row `}
      style={{
        paddingTop: inset?.top,
      }}
    >
      
      <View className={` items-center h-full justify-center `}>
        <Text className="font-bold text-md">{props?.title}</Text>
      </View>
    </View>
  );
}
