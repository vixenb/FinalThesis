import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FavStack from "../scenes/favorites";
import NotifStack from "../scenes/notifications";
import UserCardStack from "../scenes/userCard";

// Localization
import { localization } from "../localization";

//  Styles
import { Colors, SharedStyles, Typography } from "../styles";

const Tab = createMaterialTopTabNavigator();

const UserTopTab = () => {
  return (
    <Tab.Navigator
      swipeEnabled={true}
      initialRouteName="Fav"
      tabBarOptions={{
        activeTintColor: Colors.themeColor().colors.primary,

        inactiveTintColor: Colors.themeColor().colors.primary,

        allowFontScaling: true,

        pressColor: Colors.themeColor().colors.primary,

        indicatorStyle: {
          borderBottomColor: Colors.themeColor().colors.primary,
          borderBottomWidth: 3,
          marginBottom: 5
        },

        style: [{
          backgroundColor: Colors.themeColor().colors.primaryBackgroundColor
        },
        SharedStyles.shadow.elevation0
        ],

        labelStyle: {
          fontWeight: Typography.FONT_WEIGHT_BOLD,
          marginVertical: 12
        }
      }}
    >
      <Tab.Screen
        name="Fav"
        component={FavStack}
        options={{ tabBarLabel: localization("favorites") }}
      />
      <Tab.Screen
        name="Notif"
        component={NotifStack}
        options={{ tabBarLabel: localization("notifications") }}
      />
      <Tab.Screen
        name="UserCard"
        component={UserCardStack}
        options={{ tabBarLabel: localization("ticket") }}
      />
    </Tab.Navigator>
  );
};

export default UserTopTab;
