import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopTabStack from "./user-stack";

import Home from "../scenes/home";
import Artist from "../scenes/artist";
import Browser from "../scenes/browser";
import UserSettings from "../scenes/user-settings";

import Header from "../shared/header";

//  Styles
import { Colors, SharedStyles, Typography } from "../styles";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: [
          { backgroundColor: Colors.themeColor().colors.primary },
          SharedStyles.layout.standardHeaderHeight
        ]
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
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
      <Stack.Screen
        name="UserStack"
        component={TopTabStack}
        options={({ navigation }) => ({
          headerTitle: () =>
            <Header
              LeftIcon={
                <MaterialIcons
                  name="navigate-before"
                  size={Typography.FONT_SIZE_TITLE_MD * 1.5}
                  onPress={() => navigation.goBack()}
                  style={SharedStyles.typography.leftHeaderIcon}
                />
              }
              RightIcon={
                <SimpleLineIcons
                  name="settings"
                  onPress={() => navigation.navigate("UserSettings")}
                  size={Typography.FONT_SIZE_TITLE_MD * 1.3}
                  style={SharedStyles.typography.rightHeaderIcon} />
              }
            />,
          headerLeft: null
        })} />
      <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={({ navigation }) => ({
          headerTitle: () =>
            <Header
              LeftIcon={
                <MaterialIcons
                  name="navigate-before"
                  size={Typography.FONT_SIZE_TITLE_MD * 1.5}
                  onPress={() => navigation.goBack()}
                  style={SharedStyles.typography.leftHeaderIcon}
                />
              }
            />,
          headerLeft: null
        })}
      />
      <Stack.Screen
        name="Artist"
        component={Artist}
        options={({ navigation }) => ({
          headerLeft: null,
          headerTitle: () =>
            <Header
              LeftIcon={
                <MaterialIcons
                  name="navigate-before"
                  size={Typography.FONT_SIZE_TITLE_MD * 1.5}
                  onPress={() => navigation.goBack()}
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
        })} />
      <Stack.Screen
        name="Browser"
        component={Browser}
        options={({ navigation }) => ({
          headerLeft: null,
          headerTitle: () =>
            <Header
              LeftIcon={
                <MaterialIcons
                  name="navigate-before"
                  size={Typography.FONT_SIZE_TITLE_MD * 1.5}
                  onPress={() => navigation.goBack()}
                  style={SharedStyles.typography.leftHeaderIcon}
                />
              }
            />
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
