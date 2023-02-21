import React from "react";
import { Animated, Pressable } from "react-native";
import { Typography } from "../../styles";
import { NoDataMessage } from "../atoms";

const Alert = ({
  slideValue,
  slideOutAnim = () => {},
  icon,
  backgroundColor,
  textColor,
  dividerColor,
  text
}) => {
  return (
    <Animated.View style={{
      position: "absolute",
      width: "100%",
      top: -Typography.FONT_SIZE_TITLE_MD * 5,
      zIndex: 99,
      transform: [{
        translateY: slideValue
      }]
    }}>
      <Pressable onPress={() => slideOutAnim()}>
        <NoDataMessage
          logo={icon}
          text={text}
          style={{
            backgroundColor: backgroundColor
          }}
          textStyle={{
            color: textColor,
            marginLeft: Typography.FONT_SIZE_SMALL * 0.5
          }}
          dividerColor={dividerColor}
        />
      </Pressable>

    </Animated.View>
  );
};

export default Alert;
