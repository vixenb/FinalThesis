import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserTopTab from "./user-top-tab";

const Stack = createStackNavigator();

const TopTabStack = () => {
  return (
    <Stack.Navigator
      headerMode="none">
      <Stack.Screen
        name="TopTab"
        component={UserTopTab}
      />
    </Stack.Navigator>
  );
};

export default TopTabStack;
