
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
const { width, height } = Dimensions.get("window");
export default function OTP() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [second, setSecond] = useState(60);
  useEffect(() => {
    setInterval(() => {
      setSecond((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ minHeight: height, justifyContent: "center" }}>
          <View className=" w-full items-center mb-5">
            <Image style={styles.image} source={require("../assets/logo.png")} />
            <Text className="text-lg">OTP Verification</Text>
          </View>
          <StatusBar style="auto" />
          <View style={[styles.inputView, { marginBottom: 5 }]}>
            <TextInput
              style={styles.TextInput}
              placeholder={"6 digit OTP"}
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View className="flex flex-row items-center justify-between mx-2">
            <View>{second ? <Text>{second} s</Text> : null}</View>
            <View>
              {!second ? (
                <Text
                  onPress={() => {
                    setSecond(60);
                  }}
                  className="font-bold text-sky-500"
                >
                  Resend OTP
                </Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/phone_register",
                params: {
                  verified: true,
                },
              });
            }}
            style={[styles.loginBtn, { marginTop: 20 }]}
          >
            <Text style={styles.loginText}>VERIFY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            style={[styles.loginBtn, { marginTop: 15 }]}
          >
            <Text style={styles.loginText}>BACK</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor:"#D2F5F5"
  },
  inputView: {
    backgroundColor: "#D2F5F5",
    borderRadius: 30,
    width: width - 40,
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: width - 40,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "skyblue",
  },
});
