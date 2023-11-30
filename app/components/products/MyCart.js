import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { deleteApi, putApi, url } from "../../../apis";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { hideLoader, showLoader } from "../../../reducers/loader";

export default function MyNewCart({ data }) {
  const [quantity, setQuantity] = useState(data?.product.minOrder);
  const user = useSelector((s) => s.user);
  const dispatch=useDispatch()
  const updateQuantity = async (num, id) => {
    try {
      dispatch(showLoader())
      await putApi(
        "/cart/update",
        {
          quantity: num,
          cartId: id,
        },
        user.token
      );
      dispatch(hideLoader())
    } catch (error) {
      dispatch(hideLoader())
      console.error(error.response.data.message);
    }
  };
  const deleteCart = async (id) => {
    dispatch(showLoader())
    try {
      await deleteApi(
        `/cart/delete?cartId=${id}`,
        user.token
      );
      dispatch(hideLoader())
    } catch (error) {
      dispatch(hideLoader())
      console.error(error.response.data.message);
    }
  };
  useEffect(() => {
    updateQuantity(quantity, data.id);
  }, [quantity]);
  return (
    <View className="flex flex-row flex-1 bg-white rounded-md overflow-hidden">
      <Image
        className="w-[90px] h-full"
        source={{ uri: `${url}${data.product.thumbnail}` }}
      />
      <View className="flex-1 mx-2 my-1">
        <Text className="flex-1 font-semibold">
          {data.product.title} ({data.quantity})
        </Text>
        <View className="flex flex-row justify-between items-center">
          {data.product.fixedPrice && (
            <Text>
              Price:{" "}
              {(data.product.price -
                (data.product.percentage
                  ? (data.product.price * data.product.offer) / 100
                  : data.product.offer)) *
                data.quantity}
              ৳
            </Text>
          )}
          <TouchableOpacity onPress={()=>deleteCart(data.id)}>
            <MaterialCommunityIcons
              name="delete-circle"
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center">
          {data?.colors && (
            <View className="flex flex-row items-center">
              <Text className="font-medium text-xs">Color</Text>
              <View
                style={{
                  backgroundColor: data?.colors?.value,
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  marginLeft: 5,
                }}
              />
            </View>
          )}
          {data.sizes && (
            <Text className="font-medium text-xs ml-1">
              Size: {data.sizes.label}
            </Text>
          )}
          {data.specifications && (
            <Text className="font-medium text-xs ml-1">
              Quot: {data.specifications.label}
            </Text>
          )}
        </View>
        <View className="flex flex-row my-2">
          <TouchableOpacity
            onPress={() => {
              setQuantity((t) => (t > data.product?.minOrder ? t - 1 : t));
            }}
            className="w-6 h-6 rounded-full bg-sky-500 justify-center items-center shadow-md"
          >
            <Text className="text-white font-bold text-md">-</Text>
          </TouchableOpacity>
          <Text className="mx-2">{quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity((t) => (t < data.product?.quantity ? t + 1 : t));
            }}
            className="w-6 h-6 rounded-full bg-sky-500 justify-center items-center shadow-md"
          >
            <Text className="text-white font-bold text-md">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
