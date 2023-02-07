
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NewsSocialFacebook from "../scenes/news-social-facebook";
import NewsSocialInstagram from "../scenes/news-social-instagram";
import NewsSocialTwitter from "../scenes/news-social-twitter";

//  Styles
import { Colors, SharedStyles, Typography } from "../styles";

const Tab = createMaterialTopTabNavigator();

const NsTopTab = () => {
  return (
    <Tab.Navigator
      swipeEnabled="true"
      initialRouteName="Twitter"
      tabBarOptions={{
        activeTintColor: Colors.themeColor().colors.primaryTextColor,

        inactiveTintColor: Colors.themeColor().colors.primaryTextColor,

        allowFontScaling: true,

        pressColor: Colors.themeColor().colors.primary,

        indicatorStyle: {
          borderBottomColor: Colors.themeColor().colors.primaryTextColor,
          borderBottomWidth: 2,
          marginBottom: 10,
          width: "22%",
          marginHorizontal: 24
        },

        style: [{
          backgroundColor: Colors.themeColor().colors.primaryTouchable
        },
        SharedStyles.shadow.elevation0
        ],

        labelStyle: {
          fontWeight: Typography.FONT_WEIGHT_BOLD,
          fontSize: Typography.FONT_SIZE_SMALL,
          paddingVertical: 3,
          color: Colors.themeColor().colors.primaryTextColor
        }
      }}
    >
      <Tab.Screen
        name="Twitter"
        component={NewsSocialTwitter}
        options={{ tabBarLabel: "TWITTER" }}
      />
      <Tab.Screen
        name="Facebook"
        component={NewsSocialFacebook}
        options={{ tabBarLabel: "FACEBOOK" }}
      />
      <Tab.Screen
        name="Instagram"
        component={NewsSocialInstagram}
        options={{ tabBarLabel: "INSTAGRAM" }}
      />
    </Tab.Navigator>
  );
};

export default NsTopTab;
