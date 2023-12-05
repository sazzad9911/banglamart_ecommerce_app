import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Slider from "../components/Home/Slider";
import Categories from "../components/Home/Categories";
import Loader from "../components/Loader";
import Campaign from "../components/Home/Campaign";
import CurrentCampaign from "../components/Home/CurrentCampaign";
import { ScrollView } from "react-native-gesture-handler";
import NewProduct from "../components/Home/NewProduct";
import ForYou from "../components/Home/ForYou";
import BargainingProduct from "../components/Home/BargainingProduct";
import { getApi } from "../../apis";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const [images,setImages]=useState()
  useEffect(()=>{
    getApi("/adds/get/slider").then(res=>{
      setImages(res.data.data)
    })
  },[])
  if(!images){
    return <Loader/>
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      <Slider images={images} />
      <Categories/>
      <Campaign/>
      <CurrentCampaign/>
      <NewProduct/>
      <ForYou/>
      <BargainingProduct/>
      <View className="h-5"/>
    </ScrollView>
  );
}
