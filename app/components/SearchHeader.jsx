import { AntDesign } from "@expo/vector-icons";
import { Link, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Linking, Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchHeader({onChange,onPress,editable}) {
  const inset = useSafeAreaInsets();
  const router =useRouter()
  return (
    <Pressable onPress={()=>onChange?null:router.push("/search")}
      style={{
        marginTop: inset.top + 10,
        flexDirection: "row",
        alignItems: "center", 
        marginBottom: 10,
      }}
      className="mx-[20px] border border-gray-400 rounded-md px-2 py-1 h-[40px]"
    >
      <TextInput onChangeText={onChange}
        editable={editable}
        className="flex-1 h-full"
        placeholder="Search here..."
      />
      <AntDesign name="search1" size={24} color={"gray"} />
    </Pressable>
  );
}
