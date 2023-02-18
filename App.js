import React, { useEffect, useReducer, useRef, useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
// navigation
import Navigator from "./src/routes/drawer";
import 'expo-dev-client';


// endpoints
import { Events } from "./src/endpoints";

// Reducers
import { initialState } from "./src/store/initial-state";
import { reducer, StoreContext } from "./src/store/reducer";
import { actions, createAction } from "./src/store/actions";

// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// helpers
import { Artists } from "./src/helper";

// shared styles
import { Colors } from "./src/styles";

// Push notifications
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { saveToken } from "./src/endpoints/events";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  return token;
}

const getToken = async (pushNotificationsKey) => {
  try {
    const value = await AsyncStorage.getItem(pushNotificationsKey);
    if (value !== null) {
      return;
    } else {
      registerForPushNotificationsAsync().then(async (token) => {
        await AsyncStorage.setItem(pushNotificationsKey, token);
        saveToken(token);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default function App() {

  const key = "@FavouriteArtists";

  const [state, dispatch] = useReducer(reducer, initialState);

  let customArtists = [];
  const [isLoading, setIsLoading] = useState(true);
  const getAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        return jsonValue;
      }
      return "[]";
    } catch (e) {
      alert("error");
    }
  };

  // Notifications
  // eslint-disable-next-line quotes
  const notificationListener = useRef();
  const pushNotificationsKey = "@pushKey";


  useEffect(() => {
    getToken(pushNotificationsKey);

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const newObject = {
        title: notification.request.content.title,
        body: notification.request.content.body
      };
      const fullArray = state.notifications;
      fullArray.push(newObject);
      dispatch(createAction(actions.SET_NOTIFICATIONS, fullArray));
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);
  // End notifications

  const getStages = async () => {
    await Events.getStages()
      .then((json) => {
        dispatch(createAction(actions.SET_STAGES, json));
      });
  };

  const getSchedule = async () => {
    await Events.getSchedule()
      .then((json) => {
        dispatch(createAction(actions.SET_SCHEDULE, json));
      });
  };

  const getArtists = async () => {
    const favouriteArtists = JSON.parse(await getAsyncData());
    dispatch(createAction(actions.SET_FAVOURITES, favouriteArtists));

    customArtists = await Events.getArtists()
      .then((json) => {
        return Artists.setFavourites(json, favouriteArtists);
      });

    dispatch(createAction(actions.SET_ARTISTS, customArtists));
  };

  useEffect(() => {
    const myPromise = new Promise((resolve, reject) => {
      resolve(getArtists());
    });

    const promise1 = new Promise((resolve) => {
      resolve(getStages());
    });

    const promise2 = new Promise((resolve) => {
      resolve(getSchedule());
    });

    Promise.all([myPromise, promise1, promise2])
      .then(() => {
        setIsLoading(false);
      });
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: Colors.themeColor().colors.secondaryBackgroundColor }}>
        <ActivityIndicator size="large" color={Colors.themeColor().colors.primary} />
      </View>
    );
  }

  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <Navigator />
    </StoreContext.Provider >

  );
}
