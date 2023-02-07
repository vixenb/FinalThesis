import React from "react";
import { Text, Pressable, Image, StyleSheet, View } from "react-native";

//  Styles
import { Colors, Typography } from "../../styles";

const ArtistListItem = ({ name, image, press, children, descriptionBox, imageStyle, pressStar, secondChildren }) => {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={press}
        style={({ pressed }) => [
          {
            opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
          }
        ]}>
        <View style={styles.firstChildren}>
          <Image source={image} style={[
            styles.roundImage,
            imageStyle
          ]} />
          <View style={[
            descriptionBox,
            { paddingLeft: 20 }
          ]}>
            <Text style={styles.title}>{name}</Text>
            {children}
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={pressStar}
        style={({ pressed }) => [
          {
            opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
          },
          styles.mainHeaderStar
        ]}>
        {secondChildren}
      </Pressable>
    </View>);
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 8,
    marginVertical: 8,
    marginRight: 8,
    alignItems: "center"
  },
  firstChildren: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: Typography.FONT_SIZE_NORMAL,
    color: Colors.themeColor().colors.primaryTextColor,
    textTransform: "uppercase"
  },
  roundImage: {
    width: 50,
    height: 50,
    resizeMode: "cover"
  }
});

export default ArtistListItem;
