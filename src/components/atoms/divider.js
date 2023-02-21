import React from "react";
import { View, StyleSheet } from "react-native";

// Style
import { Colors } from "../../styles";

const Divider = ({ dividerStyle = null }) => {
  return <View style={[styles.divider, dividerStyle]} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.themeColor().colors.thernaryText
  }
});
