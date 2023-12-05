import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Link, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Filter from "./components/search/Filter";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { getApi } from "../apis";
import ProductCart from "./components/products/ProductCart";
import Loader from "./components/Loader";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../reducers/loader";
import { Stack } from "native-base";
import { handleInfinityScroll } from "../action";

export default function Search() {
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const [index, setIndex] = useState(-1);
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const [filter, setFilter] = useState();
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [endKey, setKey] = useState(false);
  const [seller, setSeller] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);
  useEffect(() => {
    dispatch(showLoader());
    getApi(`/product/search?query=${query}&page=${page}&perPage=20
    &byPriceFrom=${low ? low : ""}&byPriceTo=${high ? high : ""}&byBrad=${
      brand ? brand : ""
    }&bySeller=${seller}&byColor=${color}`)
      .then((res) => {
        setData(res.data.data);
        dispatch(hideLoader());
      })
      .catch((e) => {
        console.error(e.response.data.message);
      });
  }, [endKey, low, high, seller, brand, color]);
  useEffect(() => {
    dispatch(showLoader());
    getApi(`/product/searchFilter?query=${query}`).then((res) => {
      //console.log(res.data);
      setFilter(res.data);
      dispatch(hideLoader());
    });
  }, [endKey, low, high]);
  if (!data || !filter) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View
        style={{ marginTop: inset.top + 10 }}
        className="flex flex-row mx-[20px]"
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
          className=" flex-1 border border-gray-400 rounded-md px-2 py-1 h-[40px]"
        >
          <TextInput
            onChangeText={setQuery}
            value={query}
            onEndEditing={() => {
              setKey((c) => !c);
            }}
            className="flex-1 h-full"
            placeholder="Search here..."
            returnKeyType="search"
          />
          <AntDesign name="search1" size={24} color={"gray"} />
        </Pressable>
        <Pressable onPress={() => setIndex(0)} className="ml-4 mt-1">
          <Ionicons name="filter-sharp" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView
        onScroll={(e) => {
          if (handleInfinityScroll(e)) {
            dispatch(showLoader());
            getApi(`/product/search?query=${query}&page=${page}&perPage=10
            &byPriceFrom=${low ? low : ""}&byPriceTo=${high ? high : ""}&byBrad=${
              brand ? brand : ""
            }&bySeller=${seller}&byColor=${color}`)
              .then((res) => {
                //console.log(res.data.data);
                res.data.data.map(s=>{
                  setData((d) => [...d,s ]);
                })
                setPage(page + 1);
                dispatch(hideLoader());
              })
              .catch((e) => {
                console.error(e.response.data.message);
              });
          }
        }}
      >
        <View className="flex flex-row flex-wrap px-5 justify-center bg-gray-50">
          {data?.map((data, i) => (
            <ProductCart
              style={{
                marginVertical: 5,
                width: Dimensions.get("window").width / 2 - 30,
                marginHorizontal: 5,
              }}
              data={data}
              key={i}
            />
          ))}
          {data?.length == 0 ? (
            <View className="flex-1 items-center justify-center h-[60vh]">
              <SimpleLineIcons name="info" size={24} color="black" />
              <Text className="my-2 font-bold">Try Something Else</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        style={{ flex: 1 }}
      >
        <BottomSheetScrollView>
          <Filter
            sellers={filter.seller}
            brands={filter.brand}
            onLow={setLow}
            onHigh={setHigh}
            colors={filter.color}
            sizes={filter.size}
            min={filter.minPrice}
            max={filter.maxPrice}
            color={color}
            onChangeColor={setColor}
            brand={brand}
            onChangeBrand={(e) => setBrand(e)}
            seller={seller}
            onChangeSeller={setSeller}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
