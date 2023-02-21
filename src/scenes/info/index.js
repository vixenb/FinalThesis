/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

//  Styles
import { SharedStyles, Colors, Typography } from "../../styles";

//  Localization
import { localization } from "../../localization";

//  Components
import Accordian from "../../components/molecules/accordian";
import { Btn } from "../../components/atoms";

//  Vector icon
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AppLink from "react-native-app-link";
import { DeepLink } from "../../helper";

const images = [
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
  },
  {
    id: "4",
    name: "24Sata",
    image: require("../../assets/images/partners/24sata.jpg")
  },
  {
    id: "5",
    name: "JutarnjiList",
    image: require("../../assets/images/partners/jutarnji.jpg")
  },
  {
    id: "6",
    name: "Mastercard",
    image: require("../../assets/images/partners/mastercard.jpg")
  },
  {
    id: "7",
    name: "Visa",
    image: require("../../assets/images/partners/visa.png")
  },
  {
    id: "8",
    name: "Amex",
    image: require("../../assets/images/partners/amex.png")
  }
];

const Info = ({ navigation }) => {
  const [ticketLink, setTicketLink] = useState("https://ultraeurope.com/tickets/festival/");
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

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const x = currentIndex * 100;
    const y = 0;
    scrollRef.current.scrollTo({ x, y, animated: true });
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 2) % images.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <SafeAreaView style={[
      SharedStyles.layout.flex,
      {
        backgroundColor: Colors.themeColor().colors.primaryBackgroundColor
      }
    ]}>
      <ScrollView style={[
        SharedStyles.layout.standardHorizontalPadding
      ]}>
        <View style={[
          SharedStyles.layout.standardVerticalPadding
        ]}>
          <Text style={styles.header}>{localization("tickets")}</Text>
          <Text style={[styles.subHeader, SharedStyles.layout.standardVerticalPadding]}>
            {localization("getTicket")}
          </Text>
          <Btn
            press={() => navigation.navigate("WebShopBrowser", {
              link: ticketLink
            })}
            btncolor={Colors.themeColor().colors.primary}
            btnpresscolor={Colors.themeColor().colors.primaryTouchable}
            style={[
              SharedStyles.shadow.elevation6, {
                borderRadius: 10,
                alignItems: "center",
                alignSelf: "flex-start",
                justifyContent: "center",
                width:100,
                height:50
              }
            ]}>
            <FontAwesome5 name="ticket-alt" size={35} color={Colors.themeColor().colors.secondary}/>
          </Btn>
          {/* onPress={} */}
        </View>
        <View>
          <Text style={[
            styles.header,
            SharedStyles.layout.standardVerticalPadding
          ]}>{localization("generalInfo")}</Text>
          {
            data.map((item, key) => {
              return (
                <Accordian
                  key={key}
                  data={item.data}
                  title={item.title}
                />
              )
            })
          }
        </View>
        <View style={SharedStyles.layout.standardVerticalPadding}>
          <Text style={styles.header}>{localization("partners")}</Text>
          <ScrollView
            style={SharedStyles.layout.standardVerticalPadding}
            ref={scrollRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
          >
            {images.map((image, index) => (
              <Image key={index} source={image.image} style={styles.image} />
            ))}
          </ScrollView>
          <Btn
            press={handleNext}
            btncolor={Colors.themeColor().colors.primary}
            btnpresscolor={Colors.themeColor().colors.primaryTouchable}
            style={[
              SharedStyles.shadow.elevation6, {
                borderRadius: 35,
                alignItems: "center",
                alignSelf: "flex-end",
                justifyContent: "center",
                width:60,
                height:60
              }
            ]}>
            <MaterialIcons name="navigate-next" size={35} color={Colors.themeColor().colors.secondary}/>
          </Btn>
        </View>
      </ScrollView>
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
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.themeColor().colors.primary
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export default Info;
