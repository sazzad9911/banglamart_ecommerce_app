export const numberToArray = (num) => {
  let arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(" ");
  }
  return arr;
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    Alert.alert(e.message);
  }
};
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    Alert.alert(e.message);
  }
};
