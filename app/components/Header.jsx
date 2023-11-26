import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header(props) {
  const inset = useSafeAreaInsets();

  return (
    <View
      className={`px-5 bg-white shadow-md h-[60px]  items-center flex flex-row`}
      style={{
        paddingTop: inset?.top,
      }}
    >
      <Pressable onPress={() => router.back()} className="float-left">
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>
      <View className={` items-center h-full justify-center ml-2`}>
        <Text className="font-bold text-md">{props?.title}</Text>
      </View>
    </View>
  );
}
