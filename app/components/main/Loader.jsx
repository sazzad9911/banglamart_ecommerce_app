import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../action";
import { storeUser } from "../../../reducers/user";
import { useFocusEffect } from "expo-router";
import { hideLoader, showLoader } from "../../../reducers/loader";
import socket from "../../../apis/socket";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { putApi } from "../../../apis";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function Loader() {
  const loader = useSelector((s) => s.loader);
  const dispatch = useDispatch();
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    dispatch(showLoader())
    const d = await getData("USER");
    //console.log(d);
    if(d){
      socket.emit("join", {
        user: d?.user,
        id: socket.id,
      });
    }
    dispatch(hideLoader())
    dispatch(storeUser(d));
  };
  const user=useSelector(state=>state.user)
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    if (requestUserPermission()&&user) {
      messaging()
        .getToken()
        .then(async (token) => {
          try {
            await putApi(
              "/auth/update",
              {
                pushToken: token,
              },
              user.token
            );
           // console.log(token);
          } catch (error) {
            console.error(error.message);
          }
        });
    }


    // Handle user clicking on a notification and open the screen
    const handleNotificationClick = async (response) => {
      const screen = response?.notification?.request?.content?.data?.screen;
      if (screen !== null) {
        navigation.navigate(screen);
      }
    };

    // Listen for user clicking on a notification
    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationClick
      );

    // Handle user opening the app from a notification (when the app is in the background)
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.data.screen,
        navigation
      );
      if (remoteMessage?.data?.screen) {
        navigation.navigate(`${remoteMessage.data.screen}`);
      }
    });

    // Check if the app was opened from a notification (when the app was completely quit)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          if (remoteMessage?.data?.screen) {
            navigation.navigate(`${remoteMessage.data.screen}`);
          }
        }
      });

    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      };

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    });

    // Handle push notifications when the app is in the foreground
    const handlePushNotification = async (remoteMessage) => {
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      };

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    };

    // Listen for push notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(handlePushNotification);

    // Clean up the event listeners
    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, [user]);
  if (!loader) {
    return null;
  }
  return (
    <View className="absolute z-50 flex-1 justify-center items-center w-full h-full bg-[#0000004d]">
      <ActivityIndicator color={"blue"} size={"small"} />
    </View>
  );
}
