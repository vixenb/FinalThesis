import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Pressable,
  ScrollView,
  Platform
} from "react-native";

import * as Location from 'expo-location';

// Styles
import { Colors, SharedStyles, Typography } from "../../styles";

// Expo Map
import MapView, { Marker } from "react-native-maps";

// Component
import CustomMarkerRound from "../../components/atoms/marker_round";

// Kategorije pinova po kat_id
// 1 = Stage, 2 = Hrana, 3 = kamp, 4 = shop, 5 = drinks, 6 = top-ups, 7 = ulaz, 8 = parking, 9= izlaz, 10 = prva pomoc
const markers = [
  {
    kat_id: 2,
    lat: 43.711118,
    lng: 15.902616,
    title: "Restoran"
  },

  {
    kat_id: 7,
    lat: 43.711241924458065,
    lng: 15.903022103011606,
    title: "Ulaz u kamp"
  },
  {
    kat_id: 7,
    lat: 43.71110863281592,
    lng: 15.903513617813587,
    title: "Ulaz na festival"
  },
  {
    kat_id: 7,
    lat: 43.7121163102799,
    lng: 15.903444886207579,
    title: "Ulaz na parking"
  },
  {
    kat_id: 8,
    lat: 43.712059,
    lng: 15.903869,
    title: "Parking"
  },
  {
    kat_id: 9,
    lat: 43.7104094527099,
    lng: 15.904443338513373,
    title: "Izlaz"
  },
  {
    kat_id: 9,
    lat: 43.70907650443428,
    lng: 15.905708000063894,
    title: "Izlaz"
  },
  {
    kat_id: 10,
    lat: 43.710308876737635,
    lng: 15.904473178088665,
    title: "Prva pomoc"
  },
  {
    kat_id: 6,
    lat: 43.71018111792948,
    lng: 15.904535333999004,
    title: "Top-ups"
  },
  {
    kat_id: 2,
    lat: 43.710115198024035,
    lng: 15.904606412537898,
    title: "Food"
  },
  {
    kat_id: 2,
    lat: 43.71007642157519,
    lng: 15.904646645673122,
    title: "Food"
  },
  {
    kat_id: 4,
    lat: 43.709818557552296,
    lng: 15.904937665351238,
    title: "Shop"
  },
  {
    kat_id: 4,
    lat: 43.70966926734775,
    lng: 15.905095915683116,
    title: "Shop"
  },
  {
    kat_id: 2,
    lat: 43.709614010489446,
    lng: 15.905148218758907,
    title: "Food"
  },
  {
    kat_id: 2,
    lat: 43.70954905938034,
    lng: 15.905211250670757,
    title: "Food"
  },
  {
    kat_id: 2,
    lat: 43.7094821693586,
    lng: 15.905329267867412,
    title: "Food"
  },
  {
    kat_id: 4,
    lat: 43.7093910437016,
    lng: 15.905448626168575,
    title: "Shop"
  },
  {
    kat_id: 4,
    lat: 43.7093251229272,
    lng: 15.90551970470747,
    title: "Shop"
  },
  {
    kat_id: 6,
    lat: 43.70922818048017,
    lng: 15.90563503969511,
    title: "Top-ups"
  },
  {
    kat_id: 5,
    lat: 43.70923690530684,
    lng: 15.90513078440031,
    title: "Drinks"
  },
  {
    kat_id: 1,
    lat: 43.70905271425237,
    lng: 15.904924254306163,
    title: "Aero stage"
  },
  {
    kat_id: 5,
    lat: 43.70971482998215,
    lng: 15.904617141373958,
    title: "Drinks"
  },
  {
    kat_id: 1,
    lat: 43.70936583870821,
    lng: 15.904107521661128,
    title: "Aqua stage"
  },
  {
    kat_id: 5,
    lat: 43.70997657210405,
    lng: 15.904024373181667,
    title: "Drinks"
  },
  {
    kat_id: 5,
    lat: 43.71022086371988,
    lng: 15.903777609952297,
    title: "Drinks"
  },
  {
    kat_id: 1,
    lat: 43.709877691881225,
    lng: 15.903243850358333,
    title: "Terra stage"
  },
  {
    kat_id: 4,
    lat: 43.710275354862986,
    lng: 15.904119984774669,
    title: "Shop"
  },
  {
    kat_id: 4,
    lat: 43.7103800508698,
    lng: 15.903999285368998,
    title: "Shop"
  },
  {
    kat_id: 5,
    lat: 43.71154754742421,
    lng: 15.90255521661994,
    title: "Drinks"
  },
  {
    kat_id: 6,
    lat: 43.711338159306635,
    lng: 15.90278052217719,
    title: "Top-ups"
  },
  {
    kat_id: 3,
    lat: 43.7111985668218,
    lng: 15.902115334341497,
    title: "Kamp"
  }
];

const eventCoord = {
  latitude: 43.710597,
  longitude: 15.903583,
  latitudeDelta: 0.00426,
  longitudeDelta: 0.00426
};

const Map = () => {
  const [categorySelected, setCategorySelected] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(JSON.stringify(location));

    })();
  }, []);

  const renderAllMarkers = (m, index) => {
    switch (m.kat_id) {
      case 1:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.mainStagePin}
            image={require("../../assets/images/icons/main_stage.png")}
          />
        );

      case 2:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.restaurantPin}
            image={require("../../assets/images/icons/restaurant_marker.png")}
          />
        );

      case 3:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.campPin}
            image={require("../../assets/images/icons/camp_marker.png")}
          />
        );

      case 4:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.shopPin}
            image={require("../../assets/images/icons/shop_marker.png")}
          />
        );

      case 5:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.drinksPin}
            image={require("../../assets/images/icons/drinks_marker.png")}
          />
        );

      case 6:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.topupsPin}
            image={require("../../assets/images/icons/topups_marker.png")}
          />
        );

      case 7:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.enterancePin}
            image={require("../../assets/images/icons/enterance_marker.png")}
          />
        );

      case 8:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.parkingPin}
            image={require("../../assets/images/icons/parking_marker.png")}
          />
        );

      case 9:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.exitPin}
            image={require("../../assets/images/icons/exit_marker.png")}
          />
        );

      case 10:
        return (
          <CustomMarkerRound
            key={index}
            marker={m}
            color={Colors.themeColor().colors.firstaidPin}
            image={require("../../assets/images/icons/first_aid_marker.png")}
          />
        );

      default:
        return (
          <Marker
            key={index}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            tracksViewChanges={false}
            title={m.title}
          ></Marker>
        );
    }
  };

  const renderMarkersByCategory = (m, index) => {
    switch (categorySelected) {
      case 1:
        return (
          m.kat_id === 1 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.mainStagePin}
              image={require("../../assets/images/icons/main_stage.png")}
            />
          )
        );

      case 2:
        return (
          m.kat_id === 2 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.restaurantPin}
              image={require("../../assets/images/icons/restaurant_marker.png")}
            />
          )
        );

      case 3:
        return (
          m.kat_id === 3 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.campPin}
              image={require("../../assets/images/icons/camp_marker.png")}
            />
          )
        );

      case 4:
        return (
          m.kat_id === 4 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.shopPin}
              image={require("../../assets/images/icons/shop_marker.png")}
            />
          )
        );

      case 5:
        return (
          m.kat_id === 5 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.drinksPin}
              image={require("../../assets/images/icons/drinks_marker.png")}
            />
          )
        );

      case 6:
        return (
          m.kat_id === 6 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.topupsPin}
              image={require("../../assets/images/icons/topups_marker.png")}
            />
          )
        );

      case 7:
        return (
          m.kat_id === 7 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.enterancePin}
              image={require("../../assets/images/icons/enterance_marker.png")}
            />
          )
        );

      case 8:
        return (
          m.kat_id === 8 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.parkingPin}
              image={require("../../assets/images/icons/parking_marker.png")}
            />
          )
        );

      case 9:
        return (
          m.kat_id === 9 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.exitPin}
              image={require("../../assets/images/icons/exit_marker.png")}
            />
          )
        );

      case 10:
        return (
          m.kat_id === 10 && (
            <CustomMarkerRound
              key={index}
              marker={m}
              color={Colors.themeColor().colors.firstaidPin}
              image={require("../../assets/images/icons/first_aid_marker.png")}
            />
          )
        );

      default:
        return renderAllMarkers(m, index);
    }
  };

  return (
    <SafeAreaView style={SharedStyles.layout.flex}>
      <View style={SharedStyles.layout.flex}>
        <MapView style={styles.map} initialRegion={eventCoord}>
          {markers.map((m, index) => {
            return renderMarkersByCategory(m, index);
          })}
        </MapView>
        <ScrollView horizontal={true} style={styles.menuContainer}>
          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === null ? {
                backgroundColor: Colors.themeColor().colors
                  .disabledDarkGray
              } : {
                backgroundColor: Colors.themeColor().colors
                  .disabledDarkGrayLightTint
              }
            ]}
            onPress={() => setCategorySelected(null)}
          >
            <View
              style={[
                categorySelected === null ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Text
                style={[styles.categoryMenuViewText, { fontWeight: "bold" }]}
              >
                ALL
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 1 ? {
                backgroundColor: Colors.themeColor().colors.mainStagePin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .mainStagePinLightTint
              }
            ]}
            onPress={() => setCategorySelected(1)}
          >
            <View
              style={[
                categorySelected === 1 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/main_stage.png")}
                style={styles.categoryMenuViewIcon}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 2 ? {
                backgroundColor: Colors.themeColor().colors.restaurantPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .restaurantPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(2)}
          >
            <View
              style={[
                categorySelected === 2 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/restaurant_marker.png")}
                style={styles.categoryMenuViewIcon}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 3 ? {
                backgroundColor: Colors.themeColor().colors.campPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .campPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(3)}
          >
            <View
              style={[
                categorySelected === 3 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/camp_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 4 ? {
                backgroundColor: Colors.themeColor().colors.shopPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .shopPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(4)}
          >
            <View
              style={[
                categorySelected === 4 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/shop_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 5 ? {
                backgroundColor: Colors.themeColor().colors.drinksPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .drinksPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(5)}
          >
            <View
              style={[
                categorySelected === 5 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/drinks_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 6 ? {
                backgroundColor: Colors.themeColor().colors.topupsPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .topupsPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(6)}
          >
            <View
              style={[
                categorySelected === 6 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/topups_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 7 ? {
                backgroundColor: Colors.themeColor().colors.enterancePin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .enterancePinLightTint
              }
            ]}
            onPress={() => setCategorySelected(7)}
          >
            <View
              style={[
                categorySelected === 7 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/enterance_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 8 ? {
                backgroundColor: Colors.themeColor().colors.parkingPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .parkingPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(8)}
          >
            <View
              style={[
                categorySelected === 8 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/parking_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 9 ? {
                backgroundColor: Colors.themeColor().colors.exitPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .exitPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(9)}
          >
            <View
              style={[
                categorySelected === 9 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/exit_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.menuIconContainer,
              categorySelected === 10 ? {
                backgroundColor: Colors.themeColor().colors.firstaidPin
              } : {
                backgroundColor: Colors.themeColor().colors
                  .firstaidPinLightTint
              }
            ]}
            onPress={() => setCategorySelected(10)}
          >
            <View
              style={[
                categorySelected === 10 ? styles.categorySelected : styles.category,
                styles.categoryMenuView
              ]}
            >
              <Image
                source={require("../../assets/images/icons/first_aid_marker.png")}
                style={[styles.categoryMenuViewIcon]}
              />
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  menuContainer: {
    flex: 1,
    position: "absolute",
    backgroundColor: Colors.themeColor().colors.primaryTextColor,
    flexDirection: "row"
  },
  menuIconContainer: {
    padding: Typography.FONT_SIZE_TITLE_MD * 0.25,
    justifyContent: "center"
  },
  categorySelected: {
    // borderColor: Colors.themeColor().colors.primaryTextColor,
    // borderWidth: Typography.FONT_SIZE_TITLE_MD * 0.1,
    // borderRadius: Typography.FONT_SIZE_TITLE_MD * 0.1,
    opacity: 1
  },
  category: {
    opacity: 0.3
  },
  categoryMenuView: {
    padding: Typography.FONT_SIZE_TITLE_MD * 0.15,
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  categoryMenuViewIcon: {
    height: Typography.FONT_SIZE_TITLE_MD * 1.5,
    width: Typography.FONT_SIZE_TITLE_MD * 1.5,
    tintColor: Colors.themeColor().colors.primaryTextColor
  },
  categoryMenuViewText: {
    height: Typography.FONT_SIZE_TITLE_MD * 1.5,
    width: Typography.FONT_SIZE_TITLE_MD * 1.5,
    color: Colors.themeColor().colors.primaryTextColor,
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center"
  },
  pinSize: {
    height: Typography.FONT_SIZE_TITLE_MD * 1.5,
    width: Typography.FONT_SIZE_TITLE_MD * 1.5
  }
});

export default Map;
