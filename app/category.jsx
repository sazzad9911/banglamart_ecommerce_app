import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import {
  Link,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
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
import { getApi } from "../apis";
import ProductCart from "./components/products/ProductCart";
import Loader from "./components/Loader";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../reducers/loader";
import { Stack } from "native-base";
import Header from "./components/Header";
import { handleInfinityScroll } from "../action";

export default function Category() {
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const [index, setIndex] = useState(-1);
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [endKey, setKey] = useState(false);
  const [seller, setSeller] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const { id, name } = useLocalSearchParams();
  //console.log(id);

  useEffect(() => {
    getApi(`/product/search?byCategory=${id}&page=${page}&perPage=10`)
      .then((res) => {
        setData(res.data.data);
        dispatch(hideLoader());
      })
      .catch((e) => {
        console.error(e.response.data.message);
      });
  }, [id]);

  if (!data) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={name} />
      <ScrollView
        onScroll={(e) => {
            if (handleInfinityScroll(e)) {
                dispatch(showLoader());
                getApi(`/product/search?byCategory=${id}&page=${page}&perPage=10`)
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
        <View className="flex flex-row flex-wrap px-5 py-2 justify-center bg-gray-100">
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
              <Text className="my-2 font-bold">No Product</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
