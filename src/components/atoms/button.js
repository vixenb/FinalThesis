import React from "react";
import { Pressable } from "react-native";

const Btn = ({ style, press, children, btnpresscolor, btncolor }) => (
  <Pressable
    onPress={press}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? btnpresscolor : btncolor
      },
      style
    ]}>
    {children}
  </Pressable>
);

export default Btn;
