import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "native-base";

export default function Profile() {
  const inset = useSafeAreaInsets();
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginTop: inset?.top, alignItems: "center" }}>
        <TouchableOpacity className=" top-1 right-0 h-[40] w-[40] justify-center items-center rounded-full bg-gray-400">
          <AntDesign name="edit" size={20} color="black" />
        </TouchableOpacity>
        <Avatar style={{width:80, height:80}} size="giant" source={require("../../assets/ss.jpg")} />
      </View>
    </ScrollView>
  );
}
 