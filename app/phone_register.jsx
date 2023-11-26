import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useToast } from "native-base";
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
import { useDispatch } from "react-redux";
import { postApi } from "../apis";
import { hideLoader, showLoader } from "../reducers/loader";
const { width, height } = Dimensions.get("window");
import * as Yup from "yup";
import InfoAlert from "./components/main/InfoAlert";
import { storeUser } from "../reducers/user";
export default function PhoneRegister() {
  const { verified } = useLocalSearchParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    phone: "",
    name: "",
    password: "",
  });
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Too Short password!")
      .max(70, "Too Long password!")
      .required("Password is Required"),
    name: Yup.string().required("Name is Required"),
  });
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
            keyboardType="number-pad"
            style={styles.TextInput}
            placeholder={"Phone Number"}
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setValues({ ...values, phone: email })}
          />
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (values.phone.length != 11) {
              return toast.show({
                title: "Invalid Phone Number",
              });
            }
            dispatch(showLoader());
            try {
              const res = await postApi("/auth/send-otp", {
                phone: values.phone,
              });
              dispatch(hideLoader());
              toast.show({
                title: "OTP was sent successfully",
              });
              router.push({
                pathname: "/otp",
                params: { token: res.data.token, phone: values.phone },
              });
            } catch (error) {
              dispatch(hideLoader());
              return toast.show({
                title: error.response.data.message,
              });
            }
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
              onChangeText={(val) => setValues({ ...values, name: val })}
              value={values.name}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={[styles.TextInput]}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) =>
                setValues({ ...values, password: password })
              }
              value={values.password}
            />
          </View>

          <TouchableOpacity
            onPress={async () => {
              dispatch(showLoader());
              try {
                const val = await formSchema.validate(values);
                const res = await postApi("/auth/sign-up-with-phone", {
                  name: val.name,
                  password: val.password,
                  token: verified,
                });
                dispatch(hideLoader());
                dispatch(storeUser(res.data));
                router.replace("/user");
              } catch (e) {
                dispatch(hideLoader());
                const val = e?.code?.match("ERR_BAD_REQUEST");
                toast.show({
                  render: (id) => (
                    <InfoAlert
                      id={id}
                      title={"!Ops"}
                      isClosable={false}
                      variant={"solid"}
                      description={val ? e.response.data.message : e.message}
                    />
                  ),
                });
              }
            }}
            style={[styles.loginBtn, { marginTop: 20 }]}
          >
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
