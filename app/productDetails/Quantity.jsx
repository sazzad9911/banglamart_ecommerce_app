import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

export default function Quantity({ data, onChange }) {
  const [quantity, setQuantity] = useState(data?.minOrder);
  useEffect(() => {
    onChange && onChange(quantity);
  }, [quantity]);
  return (
    <View>
      <Text className="my-2 font-medium">Quantity ({data?.quantity})</Text>
      <View className="flex flex-row">
        <TouchableOpacity
          onPress={() => {
            setQuantity((t) => (t > data?.minOrder ? t - 1 : t));
          }}
          className="w-8 h-8 rounded-full bg-sky-500 justify-center items-center shadow-md"
        >
          <Text className="text-white font-bold text-md">-</Text>
        </TouchableOpacity>
        <Text className="mx-2">{quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            setQuantity((t) => (t < data?.quantity ? t + 1 : t));
          }}
          className="w-8 h-8 rounded-full bg-sky-500 justify-center items-center shadow-md"
        >
          <Text className="text-white font-bold text-md">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
