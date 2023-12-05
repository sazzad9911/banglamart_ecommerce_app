import { View, Text, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { GiftedChat } from "react-native-gifted-chat";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { getApi, postApi, url } from "../apis";
import { hideLoader, showLoader } from "../reducers/loader";
import socket from "../apis/socket";
import { StatusBar } from "expo-status-bar";

export default function ChatScreen() {
  const user = useSelector((s) => s.user);
  const [messages, setMessages] = useState([]);
  const { id } = useLocalSearchParams();
  const rec = useSelector(s=>s.deliverData)
  const dispatch = useDispatch();
  useFocusEffect(() => {
    !user && router.push("/login");
    //console.log(rec);
  });
  useEffect(() => {
    dispatch(showLoader());
    getApi(`/message/chats?conversationId=${id}`, user?.token).then((res) => {
      //console.log(res.data);
      let arr = [];
      res.data.data.map((d) => {
        arr.push({
          _id: d.id,
          text: d.message,
          createdAt: new Date(d.date),
          user: {
            _id: d.receiverId == user.user.id ? rec?.id : user.user.id,
            name: d.receiverId == user.user.id ? rec?.name : user.user.name,
            avatar:
              d.receiverId == user.user.id
                ? `${url}${rec?.image}`
                : `${url}${user.user.image}`,
          },
        });
      });
      dispatch(hideLoader());
      setMessages(arr.reverse());
    }).catch(e=>{
      dispatch(hideLoader());
      console.error(e.response.data.message);
    })
    socket.on("message", (e) => {
      if (id === e.conversationId) {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, {
            _id: e.id,
            text: e.message,
            createdAt: new Date(e.date),
            user: {
              _id: e.receiverId == user.user.id ? rec?.id : user.user.id,
              name: e.receiverId == user.user.id ? rec?.name : user.user.name,
              avatar:
                e.receiverId == user.user.id
                  ? `${url}${rec?.image}`
                  : `${url}${user.user.image}`,
            },
          })
        );
      }
    });
  }, []);
  const onSend = useCallback((messages = []) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
    send(messages);
  }, []);
  const send = async (val) => {
    
    try {
      await postApi(
        "/message/send",
        {
          message: val[0].text,
          conversationId: id,
          receiverId: rec.id,
        },
        user.token
      );
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <GiftedChat 
        messages={messages}
        onSend={(m) => {
          onSend(m);
        }}
        user={{
          _id: user.user.id,
        }}
        renderComposer={(props) => <Composer user={user.user} {...props} />}
        //renderSend={() => <Feather name="send" size={24} color="black" />}
      />
    </View>
  );
}
const Composer = (props) => {
  return (
    <View className="flex flex-row items-center px-2 py-1">
      <TextInput
        value={props.text}
        onChangeText={props.onTextChanged}
        placeholder="Write message..."
        className="flex-1 px-3 py-1 border  rounded-3xl mr-2"
      />
      <TouchableOpacity
        onPress={() => {
          props.onSend({
            _id: 1,
            text: props.text,
            createdAt: new Date(),
            user: {
              _id: props.user.id,
              name: props.user.name,
              avatar: `${url}${props.user.image}`,
            },
          });
          props.onTextChanged("");
        }}
      >
        <Feather name="send" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
