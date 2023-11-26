import { Stack } from "expo-router";
import SearchHeader from "./components/SearchHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import "react-native-reanimated";
import "react-native-gesture-handler";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "../store";
import { LogBox } from "react-native";
LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);

export default function Layout() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                href: "/index",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="user"
              options={{
                href: "/user",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="search"
              options={{
                href: "/search",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                href: "/login",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="register"
              options={{
                href: "/register",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="register_type"
              options={{
                href: "/register_type",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="phone_register"
              options={{
                href: "/phone_register",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="otp"
              options={{
                href: "/otp",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="forget_password"
              options={{
                href: "/forget_password",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="productDetails"
              options={{
                // href: "/search",
                header: (props) => <Header title="Details" {...props} />,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </Provider>
    </NativeBaseProvider>
  );
}