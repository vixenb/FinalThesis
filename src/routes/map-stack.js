import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Map from "../scenes/map";
import Header from "../shared/header";

//  Styles
import { Colors, SharedStyles, Typography } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: [
          {
            backgroundColor: Colors.themeColor().colors.primary
          },
          SharedStyles.layout.standardHeaderHeight
        ]
      }}
    >
      <Stack.Screen
        name="Map"
        component={Map}
        options={({ navigation }) => ({
          headerTitle: () =>
            <Header
              LeftIcon={
                <MaterialIcons
                  name="menu"
                  size={Typography.FONT_SIZE_TITLE_MD * 1.5}
                  onPress={() => navigation.openDrawer()}
                  style={SharedStyles.typography.leftHeaderIcon}
                />
              }
              RightIcon={
                <MaterialIcons
                  name="person-outline"
                  onPress={() => navigation.navigate("UserStack")}
                  size={Typography.FONT_SIZE_TITLE_MD * 1.5}
                  style={SharedStyles.typography.rightHeaderIcon} />
              }
            />
        })}
      />
    </Stack.Navigator>
  );
};

export default MapStack;
