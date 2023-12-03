import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../components/main/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { router, useFocusEffect } from "expo-router";
import { url } from "../../apis";
import { pickImage, storeData } from "../../action";
import { storeUser } from "../../reducers/user";
import { useState } from "react";

export default function Profile() {
  const inset = useSafeAreaInsets();
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [image,setImage]=useState()

  useFocusEffect(() => {
    !user && router.push("/login");
  });
  if (!user) {
    return;
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View
        style={{
          marginTop: inset?.top,
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View className="mt-4" />
        <Avatar editable={true} onPress={async()=>{
          try {
            const res=await pickImage()
            console.log(res);
          } catch (error) {
            
          }
        }} source={{ uri: `${url}${user.user.image}` }} />
        <Text className="font-bold text-lg my-2">{user?.user?.name}</Text>
        <View className="flex flex-row items-center mb-4">
          <FontAwesome5 name="coins" size={24} color="#d17d00" />
          <Text className="ml-2 font-bold text-[#d17d00]">
            {parseFloat(user.user.coin).toFixed(2)}
          </Text>
        </View>
        <Cart
          title={user?.user.phone}
          icon={<Entypo name="phone" size={24} color="#0391CF" />}
          subTitle={"Phone number is primary contact to identify a user."}
        />
        <Cart
          title={user?.user.email}
          icon={<MaterialIcons name="email" size={24} color="#0391CF" />}
          subTitle={"A email is a notifier to a user "}
        />
        <Cart
          title={user?.user.gender}
          icon={
            <FontAwesome5 name="transgender-alt" size={24} color="#0391CF" />
          }
          subTitle={"Gender is use to given track your you products"}
        />
        <Cart
          title={`${user?.user.address?.division}, ${user?.user.address?.district}, ${user?.user.address?.subDistrict}, ${user?.user.address?.union}`}
          icon={<FontAwesome5 name="address-card" size={24} color="#0391CF" />}
          subTitle={"Address can helps to deliver your product. "}
        />
        <Cart
          onPress={() => {
            router.push("/update");
          }}
          title={"Update Profile"}
          icon={<MaterialIcons name="update" size={24} color="#0391CF" />}
        />
        <Cart
          onPress={() => {
            router.push("/order_list");
          }}
          title={"Order List"}
          icon={<MaterialIcons name="view-list" size={24} color="#0391CF" />}
        />
        <Cart
          onPress={() => {
            router.push({
              pathname: "/webview",
              params: {
                url: "https://banglamartecommerce.com.bd/support",
              },
            });
          }}
          title={"Support"}
          icon={<FontAwesome name="support" size={24} color="#0391CF" />}
        />
        <Cart
          onPress={() => {
            router.push({
              pathname: "/webview",
              params: {
                url: "https://banglamartecommerce.com.bd/faq",
              },
            });
          }}
          title={"FAQ"}
          icon={
            <MaterialCommunityIcons
              name="chat-question"
              size={24}
              color="#0391CF"
            />
          }
        />
        <Cart
          onPress={() => {
            router.push({
              pathname: "/webview",
              params: {
                url: "https://banglamartecommerce.com.bd/termsConditions",
              },
            });
          }}
          title={"Terms & Conditions"}
          icon={
            <MaterialCommunityIcons
              name="format-list-text"
              size={24}
              color="#0391CF"
            />
          }
        />
        <Cart
          onPress={() => {
            router.push({
              pathname: "/webview",
              params: {
                url: "https://banglamartecommerce.com.bd/privacyPolicy",
              },
            });
          }}
          title={"Privacy Policy"}
          icon={<Fontisto name="user-secret" size={24} color="#0391CF" />}
        />
        <Cart
          onPress={async () => {
            await storeData("USER", null);
            dispatch(storeUser(null));
            router.push("/login");
          }}
          title={"Log Out"}
          icon={<AntDesign name="logout" size={24} color="#0391CF" />}
        />

        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  );
}
const Cart = ({ icon, title, subTitle, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row items-center w-full bg-white px-3 py-3 rounded-md my-1"
    >
      {icon}
      <View className="ml-3 flex-1">
        <Text className="text-md font-bold ">{title ? title : "N/A"}</Text>
        {subTitle && <Text>{subTitle}</Text>}
      </View>
    </Pressable>
  );
};
