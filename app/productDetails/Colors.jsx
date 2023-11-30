import { View, Text } from "react-native";
import React from "react";
import { Radio, VStack } from "native-base";
import { useState } from "react";
import { useEffect } from "react";

export default function Colors({ data,colors,sizes, onChangeColor,onChangeSize }) {
  
  return (
    <View>
      {data.colors && (
        <View>
          <Text className="font-medium my-2">Select Color</Text>
          <Radio.Group value={colors}
            name="myRadioGroup"
            accessibilityLabel="Pick your favorite number"
            onChange={(e) => {
                onChangeColor&& onChangeColor(e)
            }}
          >
            <VStack
              flexWrap={"wrap"}
              space={2}
              direction={{
                base: "row",
              }}
            >
              {data.colors.map((d, i) => (
                <Radio size={"sm"} key={i} value={d} my={1}>
                  <View
                    className="w-6 h-6 rounded-md"
                    style={{
                      backgroundColor: d?.value,
                    }}
                  />
                </Radio>
              ))}
            </VStack>
          </Radio.Group>
        </View>
      )}
      {data.sizes && (
        <View>
          <Text className="font-medium my-2">Select Size</Text>
          <Radio.Group value={sizes}
            name="myRadioGroup"
            accessibilityLabel="Pick your favorite number"
            onChange={(e) => {
                onChangeSize&& onChangeSize(e)
            }}
          >
            <VStack
              flexWrap={"wrap"}
              space={2}
              direction={{
                base: "row",
              }}
            >
              {data.sizes.map((d, i) => (
                <Radio size={"sm"} key={i} value={d} my={1}>
                  {d.label} - {d.value}
                </Radio>
              ))}
            </VStack>
          </Radio.Group>
        </View>
      )}
      {data.specifications && (
        <View>
          <Text className="font-medium my-1">Product Features</Text>
          {data.specifications.map((d, i) => (
            <Text className="my-1" key={i}>
              {d.value}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
