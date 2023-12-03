import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { View } from "react-native";
import SearchHeader from "../components/SearchHeader";
import Header from "../components/Header";
import Head from "../components/Head";

export default function Layout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          href: "/user/index",
          header: (props) => <SearchHeader editable={false} {...props} />,
        }}
      />
      <Tabs.Screen
        name="myCart"
        options={{
          href: "/user/myCart",
          header: (props) => <Head title="My Cart" {...props} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          href: "/user/notification",
          header: (props) => <Head title="Notification" {...props} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          href: "/user/messages",
          header: (props) => <Head title="Messages" {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: "/user/profile",
          headerShown: false,
        }}
      />
      
    </Tabs>
  );
}
