import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Input,
  Icon,
  Stack,
  CheckIcon,
  Select,
  TextArea,
  Menu,
  HamburgerIcon,
  Button,
  useToast,
} from "native-base";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { router, useFocusEffect } from "expo-router";
import divisions from "../data/divisions.json";
import districts from "../data/districts.json";
import subDistricts from "../data/subDistricts.json";
import unions from "../data/unions.json";
import { json2array, numberToArray, storeData } from "../action";
import { postApi, putApi } from "../apis";
import { storeUser } from "../reducers/user";
import { hideLoader, showLoader } from "../reducers/loader";
import { StatusBar } from "expo-status-bar";

export default function Update() {
  const [values, setValues] = useState({
    phone: "",
    email: "",
    gender: "",
    name: "",
  });
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const [subDistrict, setSubDistrict] = useState();
  const [union, setUnion] = useState();
  const [fullAddress, setFullAddress] = useState();
  const [districtList, setDistrictList] = useState();
  const [subDistrictList, setSubDistrictList] = useState();
  const [unionList, setUnionLst] = useState();
  const dispatch = useDispatch();
  const user = useSelector((u) => u.user);
  const toast = useToast();
  useEffect(() => {
    if (user) {
      setValues(user.user);
      if (user.user.address) {
        setDivision(user.user.address?.division);
        let dev = divisions.filter((s) =>
          s.name.match(user.user.address?.division)
        )[0];
        setDistrictList(districts.filter((d) => d.divisionId === dev.id));
        setDistrict(user.user.address?.district);
        let dis = districts.filter((s) =>
          s.name.match(user.user.address?.district)
        )[0];
        setSubDistrictList(subDistricts.filter((d) => d.districtId === dis.id));
        setSubDistrict(user.user.address?.subDistrict);

        let sub = subDistricts.filter((s) =>
          s.name.match(user.user.address?.subDistrict)
        )[0];
        setUnionLst(unions.filter((d) => d.subDistrictId === sub.id));
        setUnion(user.user.address?.union);
        setFullAddress(user.user.address?.fullAddress);
      }
    }
  }, [user]);
  const save = async () => {
    dispatch(showLoader());
    try {
      const form = new FormData();
      //form.append("name", values.name);
      //form.append("phone", values.phone);
      //form.append("email", values.email);
      //form.append("gender", values.gender);
      // form.append(
      //   "address",
      //   JSON.stringify({
      //     division: division,
      //     district: district,
      //     subDistrict: subDistrict,
      //     union: union,
      //     fullAddress: fullAddress,
      //   })
      // );
      const res = await putApi(
        "/auth/update",
        {
          name: values.name,
          phone: values.phone,
          email: values.email,
          gender: values.gender,
          address: JSON.stringify({
            division: division,
            district: district,
            subDistrict: subDistrict,
            union: union,
            fullAddress: fullAddress,
          }),
        },
        user.token
      );
      dispatch(storeUser(res.data));
      storeData("USER", res.data);
      dispatch(hideLoader());
      router.back();
    } catch (error) {
      dispatch(hideLoader());
      toast.show({
        title: error.message,
      });
    }
  };
  if (!user) {
    return;
  }
  return (
    <ScrollView className="bg-[#ffffff]" showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      <Stack className="px-5 py-4" space={4} w="100%" alignItems="center">
        <Input
          value={values.name}
          onChangeText={(e) => setValues({ ...values, name: e })}
          InputLeftElement={
            <Icon
              as={
                <MaterialIcons
                  name="drive-file-rename-outline"
                  size={24}
                  color="black"
                />
              }
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Name"
        />
        <Input
          value={values.phone}
          onChangeText={(e) => setValues({ ...values, phone: e })}
          InputLeftElement={
            <Icon
              as={<Entypo name="phone" size={24} color="#0391CF" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Phone"
        />
        <Input
          value={values.email}
          onChangeText={(e) => setValues({ ...values, email: e })}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="email" size={24} color="#0391CF" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Email"
        />

        <Select
          selectedValue={values.gender}
          minWidth="100%"
          accessibilityLabel="Choose Gender"
          placeholder="Choose Gender"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(e) => setValues({ ...values, gender: e })}
        >
          <Select.Item label="Male" value="Male" />
          <Select.Item label="Female" value="Female" />
          <Select.Item label="Other" value="Other" />
        </Select>

        <Select
          selectedValue={division}
          onValueChange={(e) => {
            setDivision(e);
            let res = divisions.filter((s) => s.name.match(e))[0];
            setDistrictList(districts.filter((d) => d.divisionId === res.id));
          }}
          minWidth="100%"
          accessibilityLabel="Choose Division"
          placeholder="Choose Division"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
        >
          {divisions.map((d) => (
            <Select.Item key={d.id} label={d.name} value={d.name} />
          ))}
        </Select>
        {districtList && (
          <Select
            selectedValue={district}
            onValueChange={(e) => {
              setDistrict(e);
              let res = districts.filter((s) => s.name.match(e))[0];
              setSubDistrictList(
                subDistricts.filter((d) => d.districtId === res.id)
              );
            }}
            minWidth="100%"
            accessibilityLabel="Choose District"
            placeholder="Choose District"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
          >
            {districtList.map((d) => (
              <Select.Item key={d.id} label={d.name} value={d.name} />
            ))}
          </Select>
        )}
        {subDistrictList && (
          <Select
            selectedValue={subDistrict}
            onValueChange={(e) => {
              setSubDistrict(e);
              let res = subDistricts.filter((s) => s.name.match(e))[0];
              setUnionLst(unions.filter((d) => d.subDistrictId === res.id));
            }}
            minWidth="100%"
            accessibilityLabel="Choose Upazila"
            placeholder="Choose Upazila"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
          >
            {subDistrictList.map((d) => (
              <Select.Item key={d.id} label={d.name} value={d.name} />
            ))}
          </Select>
        )}

        {unionList && (
          <Select
            selectedValue={union}
            onValueChange={(e) => setUnion(e)}
            minWidth="100%"
            accessibilityLabel="Choose Union"
            placeholder="Choose Union"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
          >
            {unionList.map((d) => (
              <Select.Item key={d.id} label={d.name} value={d.name} />
            ))}
          </Select>
        )}
        <TextArea
          value={fullAddress}
          onChangeText={(e) => setFullAddress(e)}
          placeholder="Full Address"
        />
        <Button
          isDisabled={
            values.phone &&
            values.name &&
            division &&
            district &&
            subDistrict &&
            union
              ? false
              : true
          }
          onPress={save}
          w="100%"
        >
          Save
        </Button>
      </Stack>
    </ScrollView>
  );
}
