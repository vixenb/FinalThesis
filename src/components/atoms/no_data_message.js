import React from "react";
import { View, Text } from "react-native";

// Style
import { Colors, Typography, SharedStyles } from "../../../styles";
import Divider from "./divider";

const NoDataMessage = ({
  text = "???",
  style = null,
  textStyle = null,
  logo,
  isDisabled,
  dividerColor = Colors.themeColor().error
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          marginHorizontal: Typography.FONT_SIZE_NORMAL / 2,
          padding: Typography.FONT_SIZE_NORMAL,
          borderRadius: Typography.FONT_SIZE_TITLE_LG / 2,
          backgroundColor: Colors.themeColor().thernaryText,
          alignItems: "flex-start"
        },
        style
      ]}
    >
      <Divider dividerStyle={{
        width: Typography.FONT_SIZE_TITLE_MD / 10,
        height: Typography.FONT_SIZE_SMALL * 1.5,
        backgroundColor: dividerColor,
        marginRight: Typography.FONT_SIZE_NORMAL / 2

      }} />

      { logo }

      <View style={{
        flex: 1,
        flexDirection: "row"
      }}>
        <Text
          style={[
            SharedStyles.typography.bodyMedum,
            {
              color: Colors.themeColor().error,
              lineHeight: Typography.LINE_HEIGHT_SMALL
            },
            textStyle
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default NoDataMessage;
