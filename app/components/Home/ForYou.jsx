import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { getApi } from "../../../apis";
import ProductCart from "../products/ProductCart";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { storeDeliver } from "../../../reducers/dataDeliver";
import { router } from "expo-router";

export default function ForYou() {
  const [products, setProducts] = useState();
  const dispatch=useDispatch()

  useEffect(() => {
    getApi(`/product/get/for-you?visitorId=r`).then((res) => {
      setProducts(res.data.data);
    });
  }, []);

  return (
    <View>
      <View className="mx-5 flex flex-row justify-between  my-4 mb-2">
        <Text className="text-lg ">For You</Text>
        <AntDesign onPress={() => {
          let arr=[]
          products.map(d=>{
           arr.push(d.productInfo)
          })
            dispatch(storeDeliver(arr));
            router.push({
              pathname: "/see_more",
              params:{
                name:"For You"
              }
            });
          }} name="rightcircle" size={24} color="black" />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="w-[15]" />
        {products?.slice(0, 10).map((category) => (
          <ProductCart key={category.id} data={category.productInfo} />
        ))}
        <View className="w-[15]" />
        {!products && (
          <View className="flex flex-row justify-center items-center w-full h-[80]">
            <ActivityIndicator size={"large"} color={"blue"} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
