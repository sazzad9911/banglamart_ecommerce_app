import { View, Text, Image, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, TextArea } from "native-base";
import { getApi, postApi, url } from "../../apis";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { numberToArray } from "../../action";
import Loader from "../components/main/Loader";
import InputButton from "./InputButton";

export default function Comments({ data }) {
  const [comments, setComments] = useState();
  const [reload, setReload] = useState(false);
  const [text, setText] = useState();
  useEffect(() => {
    getApi(`/comment/get-by-product?productId=${data.id}`).then((res) => {
      setComments(res.data.data);
    });
  }, [data]);
  const sendComment = () => {
    const form = new FormData();
    form.append("message", text);
    form.append("productId", data.id);
    postApi(`/comment/create`, form);
  };
  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg my-2">Comments({comments?.length})</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </View>
      {comments?.slice(0,2).map((d, i) => (
        <Cart data={d} key={i} />
      ))}
      {!comments && <Loader />}
      <View style={{height:12}}/>
      <TextArea
        value={text}
        onChangeText={setText}
        multiline={true}
        
        placeholder="Write comments"
      />
      <View className="flex flex-row justify-end mb-4 mt-3">
        <Button title="Send" />
      </View>
    </View>
  );
}
const Cart = ({ data }) => {
  return (
    <View>
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
          <Text className="font-semibold">{data.user.name}</Text>
          <Text>{data.message}</Text>
        </View>
      </View>
      {/* {data.image && (
        <Image
          className="w-[100px] h-[50px] ml-12 rounded-sm"
          source={{ uri: `${url}${data.image}` }}
        />
      )} */}
      {data.replay && (
        <View className="ml-20 bg-slate-200 px-2 py-1 rounded-md items-center my-2 flex flex-row">
          <MaterialCommunityIcons name="reply" size={24} color="black" />
          <Text>{data.replay}</Text>
        </View>
      )}
    </View>
  );
};
