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
import Avatar from "../components/main/Avatar";
import { useSelector } from "react-redux";
import { router, useFocusEffect } from "expo-router";
import { url } from "../../apis";

export default function Profile() {
  const inset = useSafeAreaInsets();
  const user = useSelector((s) => s.user);

  useFocusEffect(() => {
    !user && router.push("/login");
  });
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginTop: inset?.top, alignItems: "center" }}>
        <Avatar source={{uri:`${url}${user.user.image}`}}/>
        <Text>{user?.user?.name}</Text>
      </View>
    </ScrollView>
  );
}
