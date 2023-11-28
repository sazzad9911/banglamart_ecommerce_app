import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Icon, Stack, CheckIcon, Select, TextArea } from "native-base";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFocusEffect } from "expo-router";
import divisions from "../data/divisions.json";
import districts from "../data/districts.json";
import subDistricts from "../data/subDistricts.json";
import unions from "../data/unions.json";
import { json2array, numberToArray } from "../action";

export default function Update() {
  const [values, setValues] = useState({
    phone: "",
    email: "",
    gender: "",
  });
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const [subDistrict, setSubDistrict] = useState();
  const [union, setUnion] = useState();
  const [fullAddress, setFullAddress] = useState();

  const user = useSelector((u) => u.user);
  useEffect(() => {
    user && setValues(user.user);
    // json2array(division).map(d=>{
    //   console.log(d);
    // })
    
    if (user) {
      setDivision(user.user.address.division);
      setDistrict(user.user.address.district);
      setSubDistrict(user.user.address.subDistrict);
      setUnion(user.user.address.union);
      setFullAddress(user.user.address?.fullAddress);
    }
  }, [user]);
  console.log(subDistrict);
  return (
    <ScrollView className="bg-[#ffffff]" showsVerticalScrollIndicator={false}>
      <Stack className="px-5 py-4" space={4} w="100%" alignItems="center">
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
          onValueChange={(e) => setDivision(e)}
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
        <Select
          selectedValue={district}
          onValueChange={(e) => setDistrict(e)}
          minWidth="100%"
          accessibilityLabel="Choose District"
          placeholder="Choose District"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
        >
          {division
            ? districts
                .filter(
                  (s) =>
                    s.divisionId ==
                    divisions.filter((s) => s.name.match(division))[0]?.id
                )
                ?.map((d) => (
                  <Select.Item key={d.id} label={d.name} value={d.name} />
                ))
            : districts.map((d) => (
                <Select.Item key={d.id} label={d.name} value={d.name} />
              ))}
        </Select>
        <Select
          selectedValue={union}
          onValueChange={(e) => setUnion(e)}
          minWidth="100%"
          accessibilityLabel="Choose Upazila"
          placeholder="Choose Upazila"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
        >
          {district
            ? subDistricts
                .filter(
                  (s) =>
                    s.districtId ==
                    districts.filter((s) => s.name.match(district))[0]?.id
                )
                ?.map((d) => (
                  <Select.Item key={d.id} label={d.name} value={d.name} />
                ))
            : subDistricts.map((d) => (
                <Select.Item key={d.id} label={d.name} value={d.name} />
              ))}
        </Select>

        <Select
          selectedValue={union}
          onChangeText={(e) => setUnion(e)}
          minWidth="100%"
          accessibilityLabel="Choose Union"
          placeholder="Choose Union"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
        >
          {subDistrict
            ? unions
                .filter(
                  (s) =>
                    s.subDistrictId ==
                    subDistricts.filter((s) => s.name.match(subDistrict))[0]?.id
                )
                ?.map((d) => (
                  <Select.Item key={d.id} label={d.name} value={d.name} />
                ))
            : unions.map((d) => (
                <Select.Item key={d.id} label={d.name} value={d.name} />
              ))}
        </Select>
        <TextArea
          value={fullAddress}
          onChangeText={(e) => setFullAddress(e)}
          placeholder="Full Address"
        />
      </Stack>
    </ScrollView>
  );
}
