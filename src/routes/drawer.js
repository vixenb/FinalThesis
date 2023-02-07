import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

//  Import navigators
import ArtistsStack1 from "./artists-stack";
import ScheduleStack1 from "./schedule-stack";
import NewsSocialTopTab from "./news-social-stack";
import InfoTicketStack from "./info-tickets-stack";
import MerchStack from "./merch-stack";
import HomeStack from "./home-stack";
import MapStack from "./map-stack";
import MapOverlayStack from "./map-overlay-stack";
import MapRestrictedStack from "./map-restricted-stack";
import PartnersStack from "./partners-stack";

//  Import components
import DefaultDrawer from "../components/molecules/custom-drawer";

//  Localization
import { localization } from "../localization";

//  Styles
import { Colors, Typography } from "../styles";

const Drawer = createDrawerNavigator();

const rootNavigator = () => {
  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(["map", "mapOverlay", "mapRestricted"]);

  const chooseMap = () => {
    //  Promjenom map[index] mijenja se mapa u navigaciji
    const choosenMap = map[0];

    if (choosenMap === "map") return MapStack;
    else if (choosenMap === "mapOverlay") return MapOverlayStack;
    else return MapRestrictedStack;
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DefaultDrawer {...props} />}
        drawerContentOptions={{
          activeTintColor: Colors.themeColor().colors.secondary,
          inactiveTintColor: Colors.themeColor().colors.primaryTextColor,
          activeBackgroundColor: "transparent",
          itemStyle: {
            width: 170,
            alignSelf: "center",
            paddingVertical: 4,
            borderBottomColor: Colors.themeColor().colors.secondary,
            borderBottomWidth: 0.5,
            borderRadius: 16
          },
          labelStyle: {
            marginRight: -30,
            alignSelf: "center",
            textTransform: "uppercase",
            fontSize: Typography.FONT_SIZE_MEDIUM
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{ title: localization("home") }}
        />
        <Drawer.Screen
          name="Artists"
          component={ArtistsStack1}
          options={{ title: localization("artists") }}
        />
        <Drawer.Screen
          name="Schedule"
          component={ScheduleStack1}
          options={{ title: localization("schedule") }}
        />
        <Drawer.Screen
          name="NewsSocial"
          component={NewsSocialTopTab}
          options={{ title: localization("newsSocial") }}
        />
        <Drawer.Screen
          name="Map"
          component={chooseMap()}
          options={{ title: localization("map") }}
        />
        <Drawer.Screen
          name="InfoTickets"
          component={InfoTicketStack}
          options={{ title: localization("infoTickets") }}
        />
        <Drawer.Screen
          name="Merch"
          component={MerchStack}
          options={{ title: localization("merch") }}
        />
        <Drawer.Screen
          name="Partners"
          component={PartnersStack}
          options={{ title: localization("partners") }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default rootNavigator;
