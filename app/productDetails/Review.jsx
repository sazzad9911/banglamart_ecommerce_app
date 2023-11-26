import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "native-base";
import { getApi, url } from "../../apis";
import Loader from "../components/main/Loader";
import { FontAwesome, Foundation } from "@expo/vector-icons";
import { numberToArray } from "../../action";

export default function Review({ data }) {
  const [reviews, setReviews] = useState();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    getApi(`/review/get-by-product?productId=${data?.id}`).then((res) => {
      //
      
      let total = 0;
      res.data.data?.map((d) => {
        
        total = total + d.rate;
      });
      //console.log(total);
      setNumber(total/res.data.data.length);
      setReviews(res.data.data);
    });
  }, [data]);
  
  //console.log(parseInt(number/reviews?.length));
  return (
    <View>
      {reviews?.length > 0 && (
        <View>
          <View className="flex flex-row items-center mt-2 justify-between">
            <Text className=" text-lg ">Review({reviews.length})</Text>
            <View className="flex flex-row items-center">
              {numberToArray(number.toFixed(0)).map(
                (rate, i) => (
                  <Foundation key={i} name="star" size={18} color="orange" />
                )
              )}
              <Text className="text-lg ml-1">{number.toFixed(1)}</Text>
            </View>
          </View>
          {reviews?.splice(0, 3).map((d) => (
            <Cart key={d.id} data={d} />
          ))}
        </View>
      )}
      {!reviews && <Loader />}
    </View>
  );
}
const Cart = ({ data }) => {
  return (
    <View className="flex flex-row items-center my-1">
      {data.user.image ? (
        <Avatar
          source={{
            uri: `${url}${data.user.image}`,
          }}
        />
      ) : (
        <FontAwesome name="user-circle-o" size={40} color="skyblue" />
      )}
      <View className=" ml-2 justify-center">
        <Text>{data.message}</Text>
        <View className="flex flex-row items-center">
          {numberToArray(parseInt(data.rate)).map((rate, i) => (
            <Foundation key={i} name="star" size={18} color="orange" />
          ))}
        </View>
      </View>
    </View>
  );
};
