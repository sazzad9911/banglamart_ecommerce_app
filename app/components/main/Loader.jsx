import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../action";
import { storeUser } from "../../../reducers/user";
import { useFocusEffect } from "expo-router";
import { hideLoader, showLoader } from "../../../reducers/loader";
import socket from "../../../apis/socket";

export default function Loader() {
  const loader = useSelector((s) => s.loader);
  const dispatch = useDispatch();
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    dispatch(showLoader())
    const d = await getData("USER");
    //console.log(d);
    if(d){
      socket.emit("join", {
        user: d?.user,
        id: socket.id,
      });
    }
    dispatch(hideLoader())
    dispatch(storeUser(d));
  };
  if (!loader) {
    return null;
  }
  return (
    <View className="absolute z-50 flex-1 justify-center items-center w-full h-full bg-[#0000004d]">
      <ActivityIndicator color={"blue"} size={"small"} />
    </View>
  );
}
