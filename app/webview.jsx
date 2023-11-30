import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";
import { hideLoader, showLoader } from "../reducers/loader";

export default function Webview() {
  const { url,back } = useLocalSearchParams();
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  useEffect(() => {}, []);

  return (
    <WebView
      onLoadStart={() => {
        dispatch(showLoader());
      }}
      onLoadEnd={()=>{
        dispatch(hideLoader())
      }}
      onError={()=>{
        dispatch(hideLoader())
      }}
      onNavigationStateChange={e=>{
        console.log(e.url);
        console.log(back);
        if(e.url===back){
          router.back()
        }
      }}
      style={{
        flex: 1,
        marginTop: inset?.top,
      }}
      source={{ uri: url }}
    />
  );
}
