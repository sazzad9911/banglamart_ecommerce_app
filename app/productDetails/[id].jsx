import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking,
  Share,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getApi, postApi, url } from "../../apis";
import Loader from "../components/main/Loader";
import Slider from "../components/Home/Slider";
const { width, height } = Dimensions.get("window");
import ImageViewer from "react-native-image-zoom-viewer";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Avatar, useToast } from "native-base";
import Quantity from "./Quantity";
import InputButton from "./InputButton";
import { Button } from "native-base";
import Review from "./Review";
import Comments from "./Comments";
import RenderHTML from "react-native-render-html";
import Colors from "./Colors";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../reducers/loader";
import InfoAlert from "../components/main/InfoAlert";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const user = useSelector((s) => s.user);
  const toast = useToast();
  const [values, setValues] = useState({
    productId: "",
    quantity: 0,
    offerPrice: undefined,
    couponId: undefined,
  });
  const [colors,setColors]=useState()
  const [sizes,setSizes]=useState()
  const [coupon, setCoupon] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getApi(`/product/get-by-id?id=${id}`).then((res) => {
      setData(res.data.data);
      let arr = [];
      arr.push({ image: res.data.data.thumbnail });

      res.data.data.images.map((d) => {
        arr.push({ image: d });
      });
      setImages(arr);
    });
  }, [id]);
  useEffect(() => {
    if (data) {
      setValues({...values,quantity:data.minOrder});
      
    }
  }, [data]);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://banglamartecommerce.com.bd/productDetails/${data.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const handleCouponCode = async () => {
    if (!user) {
      return router.push("/login");
    }
    dispatch(showLoader());
    try {
      const res = await getApi(
        `/codes/verify-coupon-code?code=${coupon}&productId=${data.id}`,
        user.token
      );
      setValues({ ...values, couponId: res.data.code.id });
      dispatch(hideLoader());
      toast.show({
        title: "Offer added",
      });
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
  const addToCart = async (buy) => {
    // dispatch(showLoader())
    //console.log(values);
    if (!user) {
      return router.push("/login");
    }
    if ((!colors && data.colors) || (!sizes && data.sizes)) {
      return toast.show({
        render: (id) => (
          <InfoAlert
            id={id}
            title={"!Ops"}
            isClosable={false}
            variant={"solid"}
            description={"Please select color and size"}
          />
        ),
      });
    }
    try {
      dispatch(showLoader());
      await postApi("/cart/add", {
        productId:data.id,
        couponId:values.couponId,
        quantity:values.quantity,
        offerPrice:values.offerPrice,
        colors:colors,
        sizes:sizes
      }, user.token);
      dispatch(hideLoader());
      toast.show({ title: "Added into Cart" });
      if (buy) {
        router.push("/user/myCart");
      }else{
        router.back()
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.show({ title: error.response.data.message });
    }
  };
  

  if (!data) {
    return <Loader />;
  }
  return (
    <ScrollView>
      <View className="px-5 py-2 w-full">
        {images?.length > 0 && <ImageView images={images} />}
        <View className="flex flex-row items-center">
          <Text className="text-lg font-semibold mt-2 flex-1 mr-2">
            {data?.title}
          </Text>
          <Entypo
            onPress={() => onShare()}
            name="share"
            size={24}
            color="skyblue"
          />
        </View>
        <View className="flex flex-row items-center mt-1">
          <Text className="font-bold text-lg line-through text-gray-400">
            {data?.price}৳
          </Text>
          <Text className="font-bold text-lg text-red-400 ml-2">
            {data?.percentage
              ? (data?.price - (data?.price * data?.offer) / 100).toFixed(0)
              : data?.price - data.offer}
            ৳
          </Text>
          <View className="flex flex-row ml-4 ">
            <FontAwesome5 name="coins" size={24} color="#D8C100" />
            <Text className="text-base ml-1">
              {parseFloat(data?.freeCoin).toFixed(1)}
            </Text>
          </View>
        </View>
        {!data?.fixedPrice && (
          <TextInput
            value={values.offerPrice ? values.offerPrice.toString() : ""}
            onChangeText={(e) =>
              setValues({ ...values, offerPrice: parseInt(e) })
            }
            className="border rounded-lg px-2 py-1 my-2 border-[#048FB8]"
            placeholder="What is your budget?"
          />
        )}
        <View className="flex flex-row items-center mt-2">
          <Avatar
            source={{
              uri: `${url}${
                data?.seller ? data.seller.logo : data.brand.brandIcon
              }`,
            }}
          />
          <View className="ml-2">
            <Text>Origin</Text>
            <Text className="font-bold">
              {data.seller ? data.seller.shopName : data.brand.brandName}
            </Text>
          </View>
          <TouchableOpacity className="ml-4 ">
            <MaterialCommunityIcons
              name="message-arrow-right"
              size={24}
              color="black"
            />
            <Text>Chat with Seller</Text>
          </TouchableOpacity>
        </View>
        <Quantity
          onChange={(e) => setValues({ ...values, quantity: e })}
          data={data}
        />
        <Colors colors={colors}
        sizes={sizes}
          onChangeColor={(e) => {
           setColors(e)
          }}
          onChangeSize={(e) => {
           setSizes(e)
          }}
          data={data}
        />
        <InputButton
          onPress={handleCouponCode}
          value={coupon}
          onChange={(e) => setCoupon(e)}
          disabled={coupon ? false : true}
        />
        <View className="flex flex-row justify-between gap-4">
          <Button
            onPress={() => addToCart(false)}
            style={{ width: width / 2 - 30 }}
            appearance={"outline"}
            children="Add to Cart"
          />
          <Button
            onPress={() => addToCart(true)}
            style={{ width: width / 2 - 30 }}
            className="flex-1"
            children="Buy Now"
          />
        </View>
        <Review data={data} />
        <RenderHTML
          ignoredDomTags={["font", "colgroup"]}
          contentWidth={width - 40}
          source={{ html: data.description }}
        />
        <Comments data={data} />
      </View>
    </ScrollView>
  );
}

const ImageView = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  return (
    <View className="flex flex-row ">
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Image
          style={{ height: width - 108, width: width - 108 }}
          source={{ uri: `${url}${images[index].image}` }}
        />
      </TouchableOpacity>
      <View
        style={{ height: width - 108 }}
        className="w-[60] ml-2 items-center"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {images?.map((d, i) => (
            <TouchableOpacity
              className={` ${i === index && "border border-red-300"} my-1`}
              onPress={() => setIndex(i)}
              key={i}
            >
              <Image
                className={`h-[50] w-[50] `}
                source={{ uri: `${url}${d.image}` }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        onRequestClose={() => setVisible(false)}
        visible={visible}
      >
        <ImageViewer imageUrls={[{ url: `${url}${images[index].image}` }]} />
        <TouchableOpacity
          onPress={() => setVisible(false)}
          className="absolute top-1 right-1"
        >
          <Ionicons name="ios-close-circle-outline" size={35} color="red" />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
