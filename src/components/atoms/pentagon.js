import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Styles
import { Typography } from "../../styles";

const Pentagon = ({ eventWidth, color, rotate, stage, space, textColor, pointerHeight, borderWidth = 120, style }) => (
  <View style={[{ transform: [{ rotate: rotate }], width: eventWidth, marginHorizontal: space / 2 }, style]}>
    <View style={{ width: "100%", backgroundColor: color }}>
      <Text style={[styles.StagesHeaderLabel, { transform: [{ rotate: rotate }], alignSelf: "center", color: textColor }]}>{stage}</Text>
    </View>
    <View style={[styles.baseTop, {
      borderBottomColor: color,
      width: eventWidth,
      borderBottomWidth: pointerHeight,
      top: -pointerHeight,
      borderLeftWidth: borderWidth,
      borderRightWidth: borderWidth
    }]} />
    <View style={[styles.baseBottom, { backgroundColor: color, width: eventWidth }]} />
  </View>
);

const styles = StyleSheet.create({
  baseTop: {
    borderLeftWidth: 120,
    borderLeftColor: "transparent",
    borderRightWidth: 120,
    borderRightColor: "transparent",
    left: 0,
    position: "absolute"
  },
  baseBottom: {
    height: 10
  },
  StagesHeaderLabel: {
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_MEDIUM
  }
});

export default Pentagon;
