import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Radio, Stack, useToast } from "native-base";
import React, { useState } from "react";
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
} from "react-native";
const { width, height } = Dimensions.get("window");
import * as Yup from "yup";
import { getApi, postApi } from "../apis";
import InfoAlert from "./components/main/InfoAlert";
import { useDispatch } from "react-redux";
import { storeUser } from "../reducers/user";
import { hideLoader, showLoader } from "../reducers/loader";
import { storeData } from "../action";

export default function Login() {
  const [checked, setChecked] = React.useState("email");
  const [values, setValues] = useState({ email: "", password: "" });
  const toast = useToast();
  const dispatch = useDispatch();
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Too Short password!")
      .max(70, "Too Long password!")
      .required("Password is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
  });
  const phoneSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Too Short!")
      .max(70, "Too Long!")
      .required("Password is Required"),
    email: Yup.string()
      .length(11, "Invalid phone")
      .required("Phone is Required"),
  });

  const onSubmit = async () => {
    dispatch(showLoader());
    try {
      if (checked === "phone") {
        const val = await phoneSchema.validate(values);
        const res = await postApi("/auth/sign-in-with-phone", {
          phone: val.email,
          password: val.password,
        });

        // }).catch(err=>{
        //   toast.show({
        //     render: (id) => (
        //       <InfoAlert
        //         id={id}
        //         title={"!Ops"}
        //         isClosable={false}
        //         variant={"solid"}
        //         description={err.response.data.message}
        //       />
        //     ),
        //   });
        // }).then(e=>{
        //   dispatch(storeUser(e.data))
        // })
        if (res.data.user.role != 1) {
          dispatch(hideLoader());
          toast.show({
            render: (id) => (
              <InfoAlert
                id={id}
                title={"!Ops"}
                isClosable={false}
                variant={"solid"}
                description={"User is invalid"}
              />
            ),
          });
        }
        dispatch(storeUser(res.data));
        await storeData("USER", res.data);
        router.replace("/user");
        dispatch(hideLoader());
        return;
      }
      const val = await formSchema.validate(values);
      const res = await postApi("/auth/signIn", {
        email: val.email,
        password: val.password,
      });
      if (res.data.user.role != 1) {
        dispatch(hideLoader());
        toast.show({
          render: (id) => (
            <InfoAlert
              id={id}
              title={"!Ops"}
              isClosable={false}
              variant={"solid"}
              description={"User is invalid"}
            />
          ),
        });
      }
      await storeData("USER", res.data);
      dispatch(storeUser(res.data));
      router.back();
      dispatch(hideLoader());
      // }).catch(err=>{
      //   toast.show({
      //     render: (id) => (
      //       <InfoAlert
      //         id={id}
      //         title={"!Ops"}
      //         isClosable={false}
      //         variant={"solid"}
      //         description={err.response.data.message}
      //       />
      //     ),
      //   });
      // }).finally(e=>{
      //   dispatch(storeUser(e.data))
      // })
    } catch (e) {
      // console.log(e.code);
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
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ minHeight: height, justifyContent: "center" }}>
          <View className=" w-full items-center ">
            <Image
              style={styles.image}
              source={require("../assets/logo.png")}
            />
          </View>
          <StatusBar style="auto" />
          <View style={[styles.inputView, { marginBottom: 0 }]}>
            <TextInput
              style={styles.TextInput}
              placeholder={checked === "phone" ? "Phone" : "Email"}
              placeholderTextColor="#003f5c"
              onChangeText={(v) => setValues({ ...values, email: v })}
              value={values.email}
              keyboardType={
                checked === "phone" ? "number-pad" : "email-address"
              }
              //value={values.email}
            />
            {/* <ErrorMessage name="email" /> */}
          </View>
          <Radio.Group value={checked} onChange={(val) => setChecked(val)}>
            <Stack
              direction={{
                base: "row",
                md: "row",
              }}
              style={{ marginVertical: 15 }}
              alignItems={{
                base: "flex-start",
                md: "center",
              }}
              space={4}
              w="100%"
            >
              <Radio value="phone">{`Use phone`}</Radio>
              <Radio value="email">{`Use email`}</Radio>
            </Stack>
          </Radio.Group>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={values.password}
              onChangeText={(e) => setValues({ ...values, password: e })}
            />
            {/* <ErrorMessage name="password" /> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push("/forget_password");
            }}
          >
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/register_type");
            }}
            style={[styles.loginBtn, { marginTop: 15 }]}
          >
            <Text style={styles.loginText}>REGISTER</Text>
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
    backgroundColor: "#D2F5F5",
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
