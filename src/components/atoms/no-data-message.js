import React from "react";
import { View, Text } from "react-native";

// Style
import { Colors, Typography, SharedStyles } from "../../styles";

const NoDataMessage = ({ text = "???", style = null }) => {
  return (
    <View
      style={[
        {
          margin: Typography.FONT_SIZE_NORMAL,
          padding: Typography.FONT_SIZE_NORMAL,
          borderRadius: Typography.FONT_SIZE_TITLE_MD * 0.5,
          backgroundColor: Colors.themeColor().colors
            .primary
        },
        style
      ]}
    >
      <Text
        style={[
          SharedStyles.typography.bodyMedum,
          { color: Colors.themeColor().colors.primaryBackgroundColor }
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default NoDataMessage;
