import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getApi, url } from "../../../apis";
import Loader from "../Loader";
import { ScrollView } from "react-native-gesture-handler";
import ProductCart from "../products/ProductCart";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { storeDeliver } from "../../../reducers/dataDeliver";

export default function CurrentCampaign() {
  const [data, setData] = useState();
  const [products, setProducts] = useState();
  const dispatch=useDispatch()
  useEffect(() => {
    getApi("/campaign/current").then(async (res) => {
      (res.data.data.length > 0) & setData(res.data.data[0]);
      const { data } =
        res.data.data.length > 0
          ? await getApi(`/campaign/products/${res.data.data[0].id}`)
          : { data: null };
      data && setProducts(data.data);
    });
  }, []);
  if (!data || !products) {
    return <Loader />;
  }

  return (
    <View className=" my-2 items-center">
      <View className="flex flex-row w-full justify-end px-5  my-3">
        <Image
          style={{
            height: 60,
            width: 140,
            
          }}
          className="absolute top-0 left-5"
          source={{ uri: `${url}${data?.image}` }}
        />
        <AntDesign onPress={()=>{
         if(!products){
          return
        }
         let arr=[]
         products.map(d=>{
          arr.push(d.product)
         })
         dispatch(storeDeliver(arr))
          router.push({
            pathname:"/see_more",
            params:{
              name:"Campaign Products"
            }
          })
        }} name="rightcircle" size={24} color="black" />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="w-[15]" />
        {products?.slice(0, 10).map((product) => (
          <ProductCart 
            data={product.product}
            offers={product}
            key={product.id}
          />
        ))}
        <View className="w-[15]" />
      </ScrollView>
    </View>
  );
}
