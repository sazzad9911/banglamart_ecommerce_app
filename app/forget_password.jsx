
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Radio } from "native-base";
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
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ minHeight: height, justifyContent: "center" }}>
          <View className=" w-full items-center ">
            <Image style={styles.image} source={require("../assets/logo.png")} />
          </View>
          <StatusBar style="auto" />
          <View style={[styles.inputView, { marginBottom: 5 }]}>
            <TextInput
              style={styles.TextInput}
              placeholder={checked?"Phone":"Email"}
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View className="w-full items-end mb-3">
            <Radio
              checked={checked}
              status='info'
              onChange={(nextChecked) => setChecked(nextChecked)}
            >
              {`Use phone`}
            </Radio>
          </View>
          
         
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            router.back();
          }} style={[styles.loginBtn, { marginTop: 15 }]}>
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
    marginBottom: 40,
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
