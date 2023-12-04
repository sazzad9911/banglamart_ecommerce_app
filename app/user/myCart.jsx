import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
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
import RadioButton from "../components/main/RadioButton";

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
  const [method, setMethod] = useState();
  const [tranXId,setTranXId]=useState()

  useFocusEffect(() => {
    if (!user) {
      return router.push("/login");
    } else {
      getApi("/cart/get", user.token).then((response) => {
        setData(response.data.data);
        //console.log(response.data.data);
      });
    }
  });
  // useEffect(() => {

  // }, [data]);
  const applyPromoCode = async () => {
    dispatch(showLoader());
    try {
      const res = await getApi(
        `/codes/verify-promo-code?code=${codes.promoCode}`,
        user.token
      );
      setCodesData({ ...codesData, promoCode: res.data.code });
      dispatch(hideLoader());
      setCheckOut("");
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
      setCheckOut("");
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
          address: user?.user.address,
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
            <MyNewCart onChange={() => setCheckOut("")} data={data} key={i} />
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
            {user?.user.address ? (
              <Text>
                Address: {user?.user.address?.division},{" "}
                {user?.user.address?.district},{" "}
                {user?.user.address?.subDistrict}, {user?.user.address?.union}
              </Text>
            ) : (
              <Text>Address: N/A</Text>
            )}
            {user?.user.phone ? (
              <Text>Phone: {user?.user.phone}</Text>
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

            <Stack
              space={3}
              flexWrap={"wrap"}
              direction={{
                base: "row",
              }}
            >
              <RadioButton
                value={method === "bkash" ? true : false}
                title={"Bkash"}
                onChange={() => setMethod("bkash")}
              />
              <RadioButton
                value={method === "amarpay" ? true : false}
                title={"aAmar Pay"}
                onChange={() => setMethod("amarpay")}
              />
              <RadioButton
                value={method === "offline" ? true : false}
                title={"Cash On Delivery"}
                onChange={() => setMethod("offline")}
              />
              <RadioButton
                value={method === "bkash_offline" ? true : false}
                title={"Bkash Offline"}
                onChange={() => setMethod("bkash_offline")}
              />
            </Stack>
            {method === "bkash_offline" && (
              <View className="my-1 bg-white px-2 py-3 rounded-md">
                <Text>বিকাশে পেমেন্ট করুন ০১৭১৩৩৩৭৮২৫</Text>
                <InputButton disabled={tranXId?false:true} onPress={()=>{
                  toast.show({
                    title:"Transaction ID Taken",
                    
                  })
                }} onChange={setTranXId} value={tranXId} placeholder={"Trnx ID"} title={"Apply"} />
              </View>
            )}
          </View>
          {checkOut ? (
            <Button
              onPress={async () => {
                if (!method) {
                  return toast.show({
                    title: "Select a payment method",
                  });
                }
                if(method==="bkash_offline"&&!tranXId){
                  return toast.show({
                    title: "Please Give Transaction ID",
                  });
                }
                try {
                  dispatch(showLoader());
                  const res = await postApi(
                    "/order/create",
                    {
                      redirectUrl: "https://banglamartecommerce.com.bd",
                      paymentMethod: method,
                      token: checkOut.token,
                      //transactionId:tranXId
                    },
                    user.token
                  );
                  setCheckOut("");
                  setCodesData({
                    promoCode: "",
                    memberCode: "",
                  });
                  setCodes({
                    promoCode: "",
                    memberCode: "",
                  });
                  dispatch(hideLoader());
                  router.push({
                    pathname: "/webview",
                    params: {
                      url: res.data.url,
                      back: "https://banglamartecommerce.com.bd/",
                    },
                  });
                } catch (error) {
                  dispatch(hideLoader());
                  toast.show({
                    render: (id) => (
                      <InfoAlert
                        id={id}
                        title={"!Ops"}
                        isClosable={false}
                        variant={"solid"}
                        description={error.response.data.message}
                      />
                    ),
                  });
                }
              }}
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
