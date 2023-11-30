import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, router, useFocusEffect } from "expo-router";
import { useState } from "react";
import { getApi, postApi, putApi } from "../../apis";
import {
  Button,
  KeyboardAvoidingView,
  Radio,
  Stack,
  VStack,
  useToast,
} from "native-base";
import Loader from "../components/Loader";
import { SimpleLineIcons } from "@expo/vector-icons";
import MyNewCart from "../components/products/MyCart";
import InputButton from "../productDetails/InputButton";
import { hideLoader, showLoader } from "../../reducers/loader";
import InfoAlert from "../components/main/InfoAlert";

export default function MyCart() {
  const user = useSelector((s) => s.user);
  const [data, setData] = useState();
  const [codes, setCodes] = useState({
    promoCode: "",
    memberCode: "",
  });
  const [codesData, setCodesData] = useState({
    promoCode: "",
    memberCode: "",
  });
  const [checkOut, setCheckOut] = useState();
  const dispatch = useDispatch();
  const toast = useToast();

  useFocusEffect(() => {
    if (!user) {
      return router.push("/login");
    }
    getApi("/cart/get", user.token).then((response) => {
      setData(response.data.data);
      //console.log(response.data.data);
    });
  });
  const applyPromoCode = async () => {
    dispatch(showLoader());
    try {
      const res = await getApi(
        `/codes/verify-promo-code?code=${codes.promoCode}`,
        user.token
      );
      setCodesData({ ...codesData, promoCode: res.data.code });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(hideLoader());
      toast.show({
        render: (id) => (
          <InfoAlert
            id={id}
            title={"!Ops"}
            isClosable={false}
            variant={"solid"}
            description={e.response.data.message}
          />
        ),
      });
    }
  };
  const applyMemberCode = async () => {
    dispatch(showLoader());
    try {
      const res = await getApi(
        `/codes/verify-member-code?code=${codes.memberCode}`,
        user.token
      );
      setCodesData({ ...codesData, memberCode: res.data.code });
      dispatch(hideLoader());
    } catch (e) {
      dispatch(hideLoader());
      toast.show({
        render: (id) => (
          <InfoAlert
            id={id}
            title={"!Ops"}
            isClosable={false}
            variant={"solid"}
            description={e.response.data.message}
          />
        ),
      });
    }
  };
  const handleCheckOut = async () => {
    if (!user.user.address || !user.user.phone) {
      return toast.show({
        render: (id) => (
          <InfoAlert
            id={id}
            title={"!Ops"}
            isClosable={false}
            variant={"solid"}
            description={"Please update your address and phone number"}
          />
        ),
      });
    }
    dispatch(showLoader());

    try {
      let ids = [];
      data.map((d) => {
        ids.push(d.id);
      });
      const res = await postApi(
        `/order/check-out`,
        {
          cartIds: ids,
          address: user.user.address,
          specialCodeId: codesData.memberCode
            ? codesData.memberCode.id
            : undefined,
          promoId: codesData.promoCode ? codesData.promoCode.id : undefined,
        },
        user.token
      );
      setCheckOut(res.data);
      //setCheckOut({...codesData,memberCode:res.data.code})
      dispatch(hideLoader());
    } catch (e) {
      dispatch(hideLoader());
      toast.show({
        render: (id) => (
          <InfoAlert
            id={id}
            title={"!Ops"}
            isClosable={false}
            variant={"solid"}
            description={e.response.data.message}
          />
        ),
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="px-5">
        <VStack space={3} alignItems="center">
          <View />
          {data?.map((data, i) => (
            <MyNewCart data={data} key={i} />
          ))}
          {data?.length == 0 ? (
            <View className="flex-1 items-center justify-center h-[60vh]">
              <SimpleLineIcons name="info" size={24} color="black" />
              <Text className="my-2 font-bold">No Order</Text>
            </View>
          ) : null}
          {!data && (
            <View className="my-4 flex-1  h-[60vh]">
              <Loader />
            </View>
          )}
          <View className="w-full">
            <Text className="font-semibold">Apply Promo Code</Text>
            <InputButton
              onPress={applyPromoCode}
              value={codes.promoCode}
              disabled={codes.promoCode ? false : true}
              onChange={(e) => setCodes({ ...codes, promoCode: e })}
            />
            <Text className="text-red-400 text-xs">
              *Apply promo code to get discount if you have
            </Text>
          </View>
          <View className="w-full">
            <Text className="font-semibold">Apply Member Code</Text>
            <InputButton
              onPress={applyMemberCode}
              value={codes.memberCode}
              disabled={codes.memberCode ? false : true}
              onChange={(e) => setCodes({ ...codes, memberCode: e })}
            />
            <Text className="text-red-400 text-xs">
              *Apply member code to get discount if you have
            </Text>
          </View>
          <View className="w-full">
            <Text className="font-semibold">Delivery Information</Text>
            {user.user.address ? (
              <Text>
                Address: {user.user.address?.division},{" "}
                {user.user.address?.district}, {user.user.address?.subDistrict},{" "}
                {user.user.address?.union}
              </Text>
            ) : (
              <Text>Address: N/A</Text>
            )}
            {user.user.phone ? (
              <Text>Phone: {user.user.phone}</Text>
            ) : (
              <Text>Phone: N/A</Text>
            )}
          </View>
          <Button
            onPress={() => {
              router.push("/update");
            }}
            variant={"subtle"}
            w="100%"
          >
            Update Information
          </Button>
          <View className="flex flex-row justify-between items-center w-full">
            <View>
              <Text>
                Subtotal
                <Text className="text-xs">
                  {" "}
                  (include vat,member&promo offer)
                </Text>
              </Text>
              <Text>Delivery Charge</Text>
              <Text className="font-medium">Total</Text>
            </View>
            <View className="items-end">
              <Text>{checkOut ? checkOut.subTotal : "0"}৳</Text>
              <Text>+{checkOut ? checkOut.totalDeliveryFee : "0"}৳</Text>
              <Text className="font-medium">
                {checkOut
                  ? (
                      parseFloat(checkOut.subTotal) +
                      parseFloat(checkOut.totalDeliveryFee)
                    ).toFixed(2)
                  : "0"}
                ৳
              </Text>
            </View>
          </View>
          <View className="w-full ">
            <Text className="font-semibold">Select Payment Method</Text>
            <Radio.Group
              name="exampleGroup"
              defaultValue="1"
              accessibilityLabel="pick a size"
            >
              <Stack
                direction={{
                  base: "row",
                }}
                flexWrap={"wrap"}
                alignItems={{
                  base: "flex-start",
                  md: "center",
                }}
                space={4}
                w="100%"
              >
                <Radio value="1" colorScheme="yellow" size="sm" my={1}>
                  Bkash
                </Radio>
                <Radio value="2" colorScheme="yellow" size="sm" my={1}>
                  AamarPay
                </Radio>
                <Radio value="3" colorScheme="yellow" size="sm" my={1}>
                  Cash on Delivery
                </Radio>
                <Radio w={"100%"} value="4" colorScheme="yellow" size="sm" my={1}>
                  <View className="w-[80%]">
                    <Text className="font-semibold">Offline Payment</Text>
                    <InputButton />
                  </View>
                </Radio>
              </Stack>
            </Radio.Group>
          </View>
          {checkOut ? (
            <Button
              onPress={handleCheckOut}
              isDisabled={data?.length > 0 ? false : true}
              w="100%"
            >
              Confirm Order
            </Button>
          ) : (
            <Button
              onPress={handleCheckOut}
              isDisabled={data?.length > 0 ? false : true}
              w="100%"
            >
              Calculate Amount
            </Button>
          )}

          <View />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
