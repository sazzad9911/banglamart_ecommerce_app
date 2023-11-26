import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getApi, url } from "../../../apis";
import CountDown from "react-native-countdown-component";

export default function Campaign() {
  const [categories, setCategories] = useState();
  useEffect(() => {
    getApi("/campaign/upcoming").then((res) => {
      setCategories(res.data.data);
    });
  }, []);
  return (
    <View>
      <Text className="text-lg mx-5 my-4">Upcoming Campaign</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="w-[15]" />
        {categories?.map((category) => (
          <Cart key={category.id} data={category} />
        ))}
        <View className="w-[15]" />
        {!categories && (
          <View className="flex flex-row justify-center items-center w-full h-[80]">
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const Cart = ({ data }) => {
    const second=((new Date(data.startAt).getTime()-new Date().getTime())/1000).toFixed(0);
    
  return (
    <ImageBackground
      source={{
        uri: `${url}${data.image}`,
      }}
      className="w-[200px] h-[85px] mx-[5] rounded-md overflow-hidden justify-end border border-gray-300"
    >
      <View className=" items-center  bg-[#02020260]">
        <CountDown
          until={parseInt(second)}
          digitStyle={{
            height:20,
            padding:0,
            margin:0,
          }}
          style={{
            padding:0,
            margin:0,
          }}
          digitTxtStyle={{
            color:"white",
            padding:0,
            margin:0,
            fontSize:18,
            marginTop:-3
          }}
          
          timeLabelStyle={{
            color:"white",
          }}
          size={20}
        />
      </View>
    </ImageBackground>
  );
};
