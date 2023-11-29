import { AntDesign, Ionicons } from "@expo/vector-icons";
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
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Filter from "./components/search/Filter";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { getApi } from "../apis";
import ProductCart from "./components/products/ProductCart";
import Loader from "./components/Loader";

export default function Search() {
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const [index, setIndex] = useState(-1);
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const [filter, setFilter] = useState();
  const [low, setLow] = useState();
  const [high, setHigh] = useState();

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
    setIndex(index);
  }, []);
  useEffect(() => {
    getApi(`/product/search?query=${query}&page=1&perPage=20`).then((res) => {
      setData(res.data.data);
    });
  }, [query]);
  useEffect(() => {
    getApi(`/product/searchFilter?query=${query}`).then((res) => {
      //console.log(res.data);
      setFilter(res.data);
    });
  }, [query]);
  if (!data || !filter) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1 }}>
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
            className="flex-1 h-full"
            placeholder="Search here..."
          />
          <AntDesign name="search1" size={24} color={"gray"} />
        </Pressable>
        <Pressable onPress={() => setIndex(0)} className="ml-4 mt-1">
          <Ionicons name="filter-sharp" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView>
        <View style={{
          flexDirection:"row",
          flexWrap:"wrap",
          marginHorizontal:20,
        }}>
          {data?.map((data, i) => (
            <ProductCart style={{marginVertical:5,width:Dimensions.get("window").width/2-30}} data={data} key={i} />
          ))}
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
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
