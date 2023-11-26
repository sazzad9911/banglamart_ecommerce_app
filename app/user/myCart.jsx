import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, router, useFocusEffect } from "expo-router";

export default function MyCart() {
  const user = useSelector((s) => s.user);

  useFocusEffect(() => {
    !user && router.push("/login");
  });
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push("/login");
        }}
      >
        <Text>MyCart</Text>
      </TouchableOpacity>
    </View>
  );
}
