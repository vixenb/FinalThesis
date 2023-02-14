/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { View, Text, SafeAreaView, FlatList, Alert, StyleSheet } from "react-native";

//  Styles
import { SharedStyles, Colors, Typography } from "../../styles";

//  Localization
import { localization } from "../../localization";

//  Components
import Accordian from "../../components/molecules/accordian";
import { Btn } from "../../components/atoms";

//  Vector icon
import { Entypo } from "@expo/vector-icons";
import AppLink from "react-native-app-link";
import { DeepLink } from "../../helper";

const ticketsLink = "https://ultraeurope.com/tickets/festival/";

const Info = ({navigation}) => {
  const [data, setData] = useState([
    {
      key: "1",
      title: "How to find us",
      data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    },
    {
      key: "2",
      title: "Festival info",
      data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    },
    {
      key: "3",
      title: "Cashless & Contactless",
      data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    },
    {
      key: "4",
      title: "Camping",
      data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    },
    {
      key: "5",
      title: "Rules",
      data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    }
  ]);

  const renderItem = ({ item }) => (
    <Accordian
      data={item.data}
      title={item.title}
    />
  );

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
      SharedStyles.layout.flex,
      {
        backgroundColor: Colors.themeColor().colors.primaryBackgroundColor
      }
    ]}>
      <View style={[
        SharedStyles.layout.standardHorizontalPadding
      ]}>
        <View style={[
          SharedStyles.layout.standardVerticalPadding
        ]}>
          <Text style={styles.header}>{localization("tickets")}</Text>
          <Text style={styles.subHeader}>
            {localization("getTicket")}
            <Text onPress={() => navigation.navigate("WebShopBrowser", {
              link: ticketsLink
            })}
              style={{ color: Colors.themeColor().colors.secondaryTextColor, textDecorationLine: "underline" }}>
              {localization("here")}
            </Text>
            !
          </Text>
        </View>
        <View>
          <Text style={[
            styles.header,
            SharedStyles.layout.standardVerticalPadding
          ]}>{localization("generalInfo")}</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
      <Btn
        press={openCashless}
        btncolor={Colors.themeColor().colors.primary}
        btnpresscolor={Colors.themeColor().colors.primaryTouchable}
        style={[
          SharedStyles.buttons.cashlessButton,
          SharedStyles.shadow.elevation6
        ]}>
        <Entypo name="wallet" size={35} color={Colors.themeColor().colors.secondary}></Entypo>
      </Btn>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    color: Colors.themeColor().colors.primary,
    textTransform: "uppercase"
  },
  subHeader: {
    fontSize: Typography.FONT_SIZE_SMALL
  }
});

export default Info;
