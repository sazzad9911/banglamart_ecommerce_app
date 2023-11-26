import { View, Text, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { url } from "../../../apis";

export default function Slider({ images,notPlay }) {
  const { width, height } = Dimensions.get("window");
  const [index, setIndex] = useState(0);

  return (
    <View className="mx-5">
      <Carousel
        loop
        width={width - 40}
        height={width-260}
        autoPlay={notPlay?false:true}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setIndex(index)}
        style={{
          borderRadius: 10,
        }}
        renderItem={({ index, item }) => {
          return (
            <Image
              style={{
                flex: 1,
                borderRadius: 10,
              }}
              className="object-fill"
              source={{uri:`${url}${item.image}`}}
            />
          );
        }}
      />
      <View className="absolute bottom-1 w-full justify-center flex flex-row">
        {images?.map((d, i) => (
          <View
            key={i}
            className={`w-2 h-2 mx-[2px] rounded-full ${
              index === i ? "bg-yellow-400" : "border border-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
