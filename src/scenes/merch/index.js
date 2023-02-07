/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList } from "react-native";

// Styles
import { Colors, SharedStyles, Typography } from "../../styles";

// localization
import { localization } from "../../localization";

// Components
import { Btn } from "../../components/atoms";

// Vector icon
import { Entypo } from "@expo/vector-icons";
import AppLink from "react-native-app-link";
import { DeepLink } from "../../helper";

const webShopApiLink = "https://picsum.photos/v2/list?page=2&limit=10";

const MERCHDATA = [
  {
    id: "1006",
    author: "Vladimir Kudinov",
    width: 3000,
    height: 2000,
    url: "https://unsplash.com/photos/-wWRHIUklxM",
    download_url: "https://cdn.shopify.com/s/files/1/0254/4353/2848/products/DSCF4280_58a43880-8a54-4ed2-a897-dc3830418bbb_2000x.jpg?v=1583865288"
  },
  {
    id: "1008",
    author: "Benjamin Combs",
    width: 5616,
    height: 3744,
    url: "https://unsplash.com/photos/5L4XAgMSno0",
    download_url: "https://cdn.shopify.com/s/files/1/0254/4353/2848/products/DSCF4525_2000x.jpg?v=1583854106"
  },
  {
    id: "1009",
    author: "Christopher Campbell",
    width: 5000,
    height: 7502,
    url: "https://unsplash.com/photos/CMWRIzyMKZk",
    download_url: "https://cdn.shopify.com/s/files/1/0254/4353/2848/products/DSCF4454_720x.jpg?v=1583854765"
  },
  {
    id: "101",
    author: "Christian Bardenhorst",
    width: 2621,
    height: 1747,
    url: "https://unsplash.com/photos/8lMhzUjD1Wk",
    download_url: "https://cdn.shopify.com/s/files/1/0254/4353/2848/products/DSCF4629_2000x.jpg?v=1583862478"
  },
  {
    id: "1010",
    author: "Samantha Sophia",
    width: 5184,
    height: 3456,
    url: "https://unsplash.com/photos/NaWKMlp3tVs",
    download_url: "https://cdn.shopify.com/s/files/1/0254/4353/2848/products/DSCF4764_720x.jpg?v=1583958083"
  },
  {
    id: "1011",
    author: "Roberto Nickson",
    width: 5472,
    height: 3648,
    url: "https://unsplash.com/photos/7BjmDICVloE",
    download_url: "https://cdn.shopify.com/s/files/1/0254/4353/2848/products/Ultra-Merch-080-Edit_2000x.jpg?v=1574994099"
  },
  {
    id: "1012",
    author: "Scott Webb",
    width: 3973,
    height: 2639,
    url: "https://unsplash.com/photos/uAgLGG1WBd4",
    download_url: "https://cdn.shopify.com/s/files/1/0254/4353/2848/products/HoloFanny_2000x.jpg?v=1574994305"
  }
];

const Merch = ({ navigation }) => {
  const [webShop, setWebShop] = useState("https://ultramerchandise.com/");
  const [data, setData] = useState({});

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await fetch(webShopApiLink);
    const jsonData = await response.json();
    setData(jsonData);
  };

  const renderItem = ({ item }) => {
    return (
      <Image source={{ uri: `${item.download_url}` }} style={styles.boxImage} />
    );
  };

  const openCashless = () => {
    DeepLink.openLink({
      cashlessLink: "ewalletcashlessdemo://",
      appName: "eWallet cashless demo",
      appStoreId: "us",
      playStoreId: "com.mstart.ewallet_cashless_demo"
    });
  };

  return (
    <SafeAreaView style={[
      SharedStyles.layout.containerLight,
      SharedStyles.layout.standardHorizontalPadding
    ]}>
      <View>
        <Text style={[
          SharedStyles.typography.title,
          SharedStyles.layout.standardVerticalPadding
        ]}>
          {localization("festivalMerchandise")}
        </Text>
      </View>
      <View>
        <Text style={SharedStyles.typography.subtitile}>
          {`${localization("getItem")} ${localization("atThe")} `}
          <Text onPress={() => navigation.navigate("WebShopBrowser", {
            link: webShop
          })}
          style={{ color: Colors.themeColor().colors.secondaryTextColor, textDecorationLine: "underline" }}>
            {localization("festivalWebshop")}
          </Text>
          {" !"}
        </Text>

        <View style={[SharedStyles.horizontalLine.horizontalLine, styles.horizontalLine]} />

        <Text style={SharedStyles.typography.subtitile}>
          {`${localization("find")} `}
          <Text onPress={() => { navigation.navigate("Map"); }}
            style={{ color: Colors.themeColor().colors.secondaryTextColor, textDecorationLine: "underline" }}>
            {localization("ourShop")}
          </Text>
          {` ${localization("atThe")} ${localization("festivalSite")} !`}
        </Text>
      </View>
      <View style={[
        styles.flatList,
        SharedStyles.layout.flex
      ]}>
        <FlatList
          //  data={data} for API data
          data={MERCHDATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Btn
        press={openCashless}
        btncolor={Colors.themeColor().colors.primary}
        btnpresscolor={Colors.themeColor().colors.primaryTouchable}
        style={[
          SharedStyles.buttons.cashlessButton,
          SharedStyles.shadow.elevation6
        ]}>
        <Entypo name="wallet" size={Typography.FONT_SIZE_MEDIUM * 2} color={Colors.themeColor().colors.secondary} />
      </Btn>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    marginVertical: Typography.LINE_HEIGHT_SMALL / 2
  },
  boxImage: {
    resizeMode: "cover",
    alignSelf: "center",
    height: 250,
    width: "80%",
    marginVertical: Typography.LINE_HEIGHT_SMALL / 2
  },
  flatList: {
    marginVertical: Typography.LINE_HEIGHT_SMALL
  }
});

export default Merch;
