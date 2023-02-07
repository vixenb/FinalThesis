import React from "react";
import { View, Text, StyleSheet } from "react-native";

//  Styles
import { Colors, Typography } from "../../styles";

const EmptySpace = (props) => {
  return (
    <View style={styles.container}>
      {props.icon}
      <View style={[props.textBoxStyle, styles.textBox]}>
        <Text style={[
          styles.headerLabelStyle,
          props.headerStyle
        ]}>
          {props.headerLabel}
        </Text>
        <Text style={[
          styles.descriptionLabelStyle,
          props.descriptionStyle
        ]}>
          {props.descriptionLabel}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  descriptionLabelStyle: {
    color: Colors.themeColor().colors.empty,
    fontSize: Typography.FONT_SIZE_SMALL,
    textAlign: "center"
  },
  headerLabelStyle: {
    fontSize: Typography.FONT_SIZE_TITLE_MD,
    paddingBottom: 8,
    fontWeight: Typography.FONT_WEIGHT_NORMAL
  },
  textBox: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default EmptySpace;
