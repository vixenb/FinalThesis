import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SharedStyles, Typography, Colors } from "../../styles";
import { AntDesign } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    name: "mStart",
    image: require("../../assets/images/partners/mStart.png")
  },
  {
    id: "2",
    name: "Konzum",
    image: require("../../assets/images/partners/konzum.png")
  },
  {
    id: "3",
    name: "INA",
    image: require("../../assets/images/partners/ina.png")
  }
];

const DATA_SECOND = [
  {
    id: "1",
    name: "Mastercard",
    image: require("../../assets/images/partners/mastercard.jpg")
  },
  {
    id: "2",
    name: "Visa",
    image: require("../../assets/images/partners/visa.png")
  },
  {
    id: "3",
    name: "Amex",
    image: require("../../assets/images/partners/amex.png")
  }
];

const DATA_THIRD = [
  {
    id: "1",
    name: "24Sata",
    image: require("../../assets/images/partners/24sata.jpg")
  },
  {
    id: "2",
    name: "JutarnjiList",
    image: require("../../assets/images/partners/jutarnji.jpg")
  }
];
const Partners = ({ navigation }) => {
  const [value, setValue] = useState(0);
  const [valueSecond, setValueSecond] = useState(0);
  const [valueThird, setValueThird] = useState(0);

  return (
    <View style={[
      SharedStyles.layout.containerLight,
      styles.screenContainer
    ]}>
      <Text style={styles.headerLabel}>Partners</Text>
      <View style={styles.container}>
        <View style={styles.arrowContainer}>
          <Pressable onPress={() => value === 0 ? setValue(2) : setValue(value - 1)} style={styles.icons}>
            <AntDesign name="leftcircleo" size={32} color={Colors.themeColor().colors.primaryTouchable} />
          </Pressable>
          <View>
            <Image source={DATA[value].image} style={[styles.imageStyle, { width: 200, height: 200 }]} />
          </View>
          <Pressable onPress={() => value === 2 ? setValue(0) : setValue(value + 1)} style={styles.icons}>
            <AntDesign name="rightcircleo" size={32} color={Colors.themeColor().colors.primaryTouchable} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.headerLabel}>Co-Partners</Text>
      <View style={styles.container}>
        <View style={styles.arrowContainer}>
          <Pressable onPress={() => valueSecond === 0 ? setValueSecond(2) : setValueSecond(valueSecond - 1)} style={styles.icons}>
            <AntDesign name="leftcircleo" size={32} color={Colors.themeColor().colors.primaryTouchable} />
          </Pressable>
          <View>
            <Image source={DATA_SECOND[valueSecond].image} style={[styles.imageStyle]} />
          </View>
          <Pressable onPress={() => valueSecond === 2 ? setValueSecond(0) : setValueSecond(valueSecond + 1)} style={styles.icons}>
            <AntDesign name="rightcircleo" size={32} color={Colors.themeColor().colors.primaryTouchable} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.headerLabel}>Media Partners</Text>
      <View style={styles.container}>
        <View style={styles.arrowContainer}>
          <Pressable onPress={() => valueThird === 0 ? setValueThird(1) : setValueThird(0)} style={styles.icons}>
            <AntDesign name="leftcircleo" size={32} color={Colors.themeColor().colors.primaryTouchable} />
          </Pressable>
          <View>
            <Image source={DATA_THIRD[valueThird].image} style={[styles.imageStyle]} />
          </View>
          <Pressable onPress={() => valueThird === 1 ? setValueThird(0) : setValueThird(1)} style={styles.icons}>
            <AntDesign name="rightcircleo" size={32} color={Colors.themeColor().colors.primaryTouchable} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center"
  },
  imageStyle: {
    width: 160,
    height: 160,
    resizeMode: "cover",
    backgroundColor: Colors.themeColor().colors.primaryTextColor

  },
  imageContainer: {
    backgroundColor: "white"
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16
  },
  labelStyle: {
    textAlign: "center",
    fontSize: Typography.FONT_SIZE_TITLE_MD * 1.5,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    color: Colors.themeColor().colors.secondaryTextColor,
    textTransform: "uppercase",
    paddingBottom: 16,
    paddingTop: 24
  },
  icons: {
    paddingHorizontal: 24
  },
  headerLabel: {
    fontSize: Typography.FONT_SIZE_TITLE_LG,
    color: Colors.themeColor().colors.primary,
    fontWeight: Typography.FONT_WEIGHT_NORMAL,
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderColor: Colors.themeColor().colors.primaryTouchable,
    marginHorizontal: 16,
    paddingTop: 16
  }
});

export default Partners;
