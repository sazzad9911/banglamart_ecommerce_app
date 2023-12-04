import { View, Text, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import RadioButton from "../main/RadioButton";
import { MotiView } from "moti";
import { AntDesign } from "@expo/vector-icons";
import RangeSlider, { Slider } from "react-native-range-slider-expo";

export default function Filter({
  min,
  max,
  onLow,
  onHigh,
  sellers,
  brands,
  colors,
  sizes,
  brand,
  color,
  seller,
  onChangeSeller,
  onChangeBrand,
  onChangeColor,
}) {
  const [low, setLow] = useState(0);
  const [hight, setHigh] = useState(100);
  console.log(brand);

  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
  return (
    <View className=" bg-white px-2 py-1">
      <Text className=" text-lg">Filter</Text>
      <View className="bg-slate-200 rounded-md h-[95] my-1">
        <RangeSlider
          min={min}
          max={max}
          fromValueOnChange={(value) => onLow(value)}
          toValueOnChange={(value) => onHigh(value)}
          initialFromValue={11}
          styleSize="small"
        />
      </View>
      {sellers?.length > 0 && (
        <Cart
          data={sellers}
          Children={(e) => (
            <RadioButton
              value={e.data.id == seller ? true : false}
              onChange={() => onChangeSeller && onChangeSeller(seller==e.data.id?"":e.data.id)}
              key={e.data.id}
              title={e.data.shopName}
            />
          )}
          title={"Seller"}
        />
      )}
      {brands?.length > 0 && (
        <Cart
          data={brands}
          Children={(e) => (
            <RadioButton
              value={e.data.id == brand ? true : false}
              onChange={() => onChangeBrand && onChangeBrand(brand==e.data.id?"":e.data.id)}
              key={e.data.id}
              title={e.data.brandName}
            />
          )}
          title={"Brand"}
        />
      )}
      {colors?.length > 0 && (
        <Cart
          data={colors}
          Children={(e) => (
            <RadioButton
              value={e.data.label == color ? true : false}
              onChange={() => onChangeColor && onChangeColor(color==e.data.label?"":e.data.label)}
              key={e.data.id}
              title={e.data.label}
            />
          )}
          title={"Colors"}
        />
      )}
      {sizes?.length > 0 && (
        <Cart
          data={sizes}
          Children={(e) => (
            <RadioButton
              key={e.data.id}
              title={`${e.data.label} : ${e.data.value}`}
            />
          )}
          title={"Sizes"}
        />
      )}
    </View>
  );
}
const Cart = ({ title, data, Children }) => {
  const [height, setHeight] = useState(false);
  return (
    <Pressable
      onPress={() => setHeight((v) => !v)}
      className="px-2 py-2 bg-slate-200 my-1 rounded-sm"
      style={{
        height: height,
        overflow: "hidden",
      }}
    >
      <View className="flex flex-row w-full justify-between">
        <Text className="font-bold">{title}</Text>
        <AntDesign name="pluscircleo" size={20} color="black" />
      </View>
      {height && (
        <View className="">
          {data?.map((d) => (
            <Children data={d} />
          ))}
        </View>
      )}
    </Pressable>
  );
};
