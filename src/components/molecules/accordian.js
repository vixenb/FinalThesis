/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { View, Text, StyleSheet, LayoutAnimation, UIManager, Pressable, Platform } from "react-native";

//  Expo vector icon
import { MaterialIcons } from "@expo/vector-icons";

//  Styles
import { SharedStyles, Colors, Typography } from "../../styles";

const Accordian = ({ data, title }) => {
  const [expanded, setExpanded] = useState(false);
  const [descriptionData, setDescriptionData] = useState(data);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expanded === false) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  return (
    <View>
      <Pressable
        onPress={toggleExpand}
        style={({ pressed }) => [
          {
            opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
          },
          styles.row
        ]}>
        <Text style={SharedStyles.typography.subtitile}>{title}</Text>
        <MaterialIcons name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor().colors.secondaryTextColor} />
      </Pressable>
      {
        expanded &&
                <View style={SharedStyles.layout.standardVerticalPadding}>
                  <Text>{descriptionData}</Text>
                </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    marginVertical: 8,
    alignItems: "center",
    borderBottomWidth: 1
  }
});

export default Accordian;
