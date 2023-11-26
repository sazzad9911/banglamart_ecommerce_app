
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");
export default function PhoneRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);
  const { verified } = useLocalSearchParams();
  if (!verified) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View className=" w-full items-center mb-5">
          <Image style={styles.image} source={require("../assets/ss.jpg")} />
          <Text className="text-lg">Phone Number Register</Text>
        </View>
        <View style={[styles.inputView, { marginBottom: 20 }]}>
          <TextInput
            style={styles.TextInput}
            placeholder={"Phone Number"}
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/otp");
          }}
          style={[styles.loginBtn, { marginTop: 20 }]}
        >
          <Text style={styles.loginText}>SEND OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={[styles.loginBtn, { marginTop: 15 }]}
        >
          <Text style={styles.loginText}>BACK</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ minHeight: height, justifyContent: "center" }}>
          <View className=" w-full items-center mb-5">
            <Image style={styles.image} source={require("../assets/ss.jpg")} />
            <Text className="text-lg">Register Here</Text>
          </View>
          <StatusBar style="auto" />
          <View style={[styles.inputView, { marginBottom: 20 }]}>
            <TextInput
              style={styles.TextInput}
              placeholder={"Name"}
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput]}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity style={[styles.loginBtn, { marginTop: 20 }]}>
            <Text style={styles.loginText}>REGISTER</Text>
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
