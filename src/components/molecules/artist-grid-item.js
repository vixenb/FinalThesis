import React from "react";
import { Text, Pressable, Image, StyleSheet, Dimensions } from "react-native";

//  Styles
import { Colors, SharedStyles, Typography } from "../../styles";

const windowWidth = Dimensions.get("window").width;

const ArtistGridItem = ({ name, img, press }) => (
  <Pressable
    onPress={press}
    style={({ pressed }) => [
      {
        opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
      },
      styles.box
    ]}>
    <Image source={img} style={[styles.boxImage]} ></Image>
    <Text style={[
      styles.boxText,
      SharedStyles.layout.standardHorizontalPadding
    ]}>{name}</Text>
  </Pressable>
);

const styles = StyleSheet.create({

  box: {
    width: windowWidth / 2,
    height: 200,
    borderWidth: 1,
    overflow: "hidden"
  },
  boxImage: {
    position: "absolute",
    resizeMode: "cover",
    width: windowWidth / 2,
    height: 200
  },
  boxText: {
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: Colors.themeColor().colors.secondaryBackgroundColor,
    position: "absolute",
    left: 0,
    bottom: 10,
    width: "85%",
    color: Colors.themeColor().colors.primaryTextColor,
    backgroundColor: Colors.themeColor().colors.secondaryBackgroundColor,
    fontWeight: Typography.FONT_WEIGHT_NORMAL,
    textTransform: "uppercase"
  }
});

export default ArtistGridItem;
