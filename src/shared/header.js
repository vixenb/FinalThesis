import React from "react";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Styles
import { SharedStyles } from "../styles";

export default function Header ({ RightIcon, LeftIcon, headerStyle }) {
  const iosStyle = {
    width: Dimensions.get("window").width
  };

  return (
    <View style={[styles.header, headerStyle, Platform.OS === "ios" && iosStyle]}>
      {LeftIcon}
      <View>
        <Image style={SharedStyles.typography.headerLogo} source={require("../assets/images/icons/superear_logo.png")}/>
      </View>
      {RightIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    // width: Dimensions.get("window").width / 1.1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
