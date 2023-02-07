import React, { useEffect, createRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Pressable,
  ScrollView
} from "react-native";

// Styles
import { Colors, SharedStyles, Typography } from "../../styles";

// Expo Map
import MapView, { Marker } from "react-native-maps";

// Components
import MarkerDropWithBG from "../../components/atoms/marker_drop_with_background";

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
  latitudeDelta: 0.015,
  longitudeDelta: 0.015
};

const mapStyle = [
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on"
      },
      {
        weight: 1
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#e8e8e3"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      {
        color: "#f9f2e6"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#a2d18a"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

const MapRestricted = () => {
  const [categorySelected, setCategorySelected] = useState(null);

  const mapRef = createRef();

  useEffect(() => {
    // koristi se za prikaz mape sa ogranicenim panom
    if (mapRef.current !== null) {
      mapRef.current.setMapBoundaries(
        { latitude: 43.71284, longitude: 15.906161 },
        { latitude: 43.708187, longitude: 15.901526 }
      );
    }
  });

  const renderAllMarkers = (m, index) => {
    switch (m.kat_id) {
      case 1:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.mainStagePin}
            image={require("../../assets/images/icons/main_stage.png")}
          />
        );

      case 2:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.restaurantPin}
            image={require("../../assets/images/icons/restaurant_marker.png")}
          />
        );

      case 3:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.campPin}
            image={require("../../assets/images/icons/camp_marker.png")}
          />
        );

      case 4:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.shopPin}
            image={require("../../assets/images/icons/shop_marker.png")}
          />
        );

      case 5:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.drinksPin}
            image={require("../../assets/images/icons/drinks_marker.png")}
          />
        );

      case 6:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.topupsPin}
            image={require("../../assets/images/icons/topups_marker.png")}
          />
        );

      case 7:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.enterancePin}
            image={require("../../assets/images/icons/enterance_marker.png")}
          />
        );

      case 8:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.parkingPin}
            image={require("../../assets/images/icons/parking_marker.png")}
          />
        );

      case 9:
        return (
          <MarkerDropWithBG
            key={index}
            marker={m}
            color={Colors.themeColor().colors.exitPin}
            image={require("../../assets/images/icons/exit_marker.png")}
          />
        );

      case 10:
        return (
          <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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
            <MarkerDropWithBG
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

  const menu = () => {
    return isVisible ? (
      <ScrollView style={[styles.menuContainer]}>
        <Pressable
          style={[
            styles.menuIconContainer,
            { backgroundColor: Colors.themeColor().colors.primaryTouchable }
          ]}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.categoryMenuView}>
            <View
              style={[
                styles.categoryMenuViewIcon,
                { alignItems: "center", justifyContent: "center" }
              ]}
            >
              <Image
                source={require("../../assets/images/icons/close_icon.png")}
                style={[
                  {
                    width: 17,
                    height: 17,
                    tintColor: Colors.themeColor().colors.disabledLightGray
                  }
                ]}
              />
            </View>
          </View>
        </Pressable>

        <Pressable
          style={[
            styles.menuIconContainer,
            categorySelected === null ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.disabledDarkGray
            }
          ]}
          onPress={() => {
            setCategorySelected(null);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === null && styles.categorySelected,
              styles.categoryMenuView
            ]}
          >
            <Text
              style={[
                styles.categoryMenuViewText,
                categorySelected === null ? styles.categorySelected : {
                  color: Colors.themeColor().colors.secondaryTextColor
                }
              ]}
            >
              ALL
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={[
            styles.menuIconContainer,
            categorySelected === 1 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.mainStagePin
            }
          ]}
          onPress={() => {
            setCategorySelected(1);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 1 && styles.categorySelected,
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
            categorySelected === 2 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.restaurantPin
            }
          ]}
          onPress={() => {
            setCategorySelected(2);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 2 && styles.categorySelected,
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
            categorySelected === 3 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.campPin
            }
          ]}
          onPress={() => {
            setCategorySelected(3);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 3 && styles.categorySelected,
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
            categorySelected === 4 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.shopPin
            }
          ]}
          onPress={() => {
            setCategorySelected(4);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 4 && styles.categorySelected,
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
            categorySelected === 5 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.drinksPin
            }
          ]}
          onPress={() => {
            setCategorySelected(5);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 5 && styles.categorySelected,
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
            categorySelected === 6 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.topupsPin
            }
          ]}
          onPress={() => {
            setCategorySelected(6);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 6 && styles.categorySelected,
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
            categorySelected === 7 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.enterancePin
            }
          ]}
          onPress={() => {
            setCategorySelected(7);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 7 && styles.categorySelected,
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
            categorySelected === 8 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.parkingPin
            }
          ]}
          onPress={() => {
            setCategorySelected(8);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 8 && styles.categorySelected,
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
            categorySelected === 9 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.exitPin
            }
          ]}
          onPress={() => {
            setCategorySelected(9);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 9 && styles.categorySelected,
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
            categorySelected === 10 ? styles.categorySelected : {
              backgroundColor: Colors.themeColor().colors.firstaidPin
            }
          ]}
          onPress={() => {
            setCategorySelected(10);
            setIsVisible(false);
          }}
        >
          <View
            style={[
              categorySelected === 10 && styles.categorySelected,
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
    ) : (
      <Pressable
        style={[styles.menuContainer, { opacity: 0.8 }]}
        onPress={() => setIsVisible(true)}
      >
        <View style={styles.menuIconContainer}>
          <View
            style={[
              styles.categoryMenuViewIcon,
              { alignItems: "center", justifyContent: "center" }
            ]}
          >
            <Image
              source={require("../../assets/images/icons/marker_list.png")}
              style={[
                {
                  width: 17,
                  height: 17,
                  tintColor: Colors.themeColor().colors.disabledDarkGray
                }
              ]}
            />
          </View>
        </View>
      </Pressable>
    );
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaView style={SharedStyles.layout.flex}>
      <View style={SharedStyles.layout.flex}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={eventCoord}
          maxZoomLevel={20}
          minZoomLevel={17}
          customMapStyle={mapStyle}
        >
          {markers.map((m, index) => {
            return renderMarkersByCategory(m, index);
          })}
        </MapView>

        {menu()}
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
    backgroundColor: "black"
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

export default MapRestricted;
