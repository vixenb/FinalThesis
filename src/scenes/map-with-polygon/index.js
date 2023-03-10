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
//Styles
import { Colors, SharedStyles, Typography } from "../../styles";

//Expo Map
import MapView, { Marker, Polygon } from "react-native-maps";

// Component
import CustomMarker from "../../components/atoms/marker_drop";

// Kategorije pinova po kat_id
// 1 = Stage, 2 = Hrana, 3 = kamp, 4 = shop, 5 = drinks, 6 = top-ups, 7 = ulaz, 8 = parking, 9= izlaz, 10 = prva pomoc
const markers = [
  {
    kat_id: 2,
    lat: 43.711118,
    lng: 15.902616,
    title: "Restoran",
  },

  {
    kat_id: 7,
    lat: 43.711241924458065,
    lng: 15.903022103011606,
    title: "Ulaz u kamp",
  },
  {
    kat_id: 7,
    lat: 43.71110863281592,
    lng: 15.903513617813587,
    title: "Ulaz na festival",
  },
  {
    kat_id: 7,
    lat: 43.7121163102799,
    lng: 15.903444886207579,
    title: "Ulaz na parking",
  },
  {
    kat_id: 8,
    lat: 43.712059,
    lng: 15.903869,
    title: "Parking",
  },
  {
    kat_id: 9,
    lat: 43.7104094527099,
    lng: 15.904443338513373,
    title: "Izlaz",
  },
  {
    kat_id: 9,
    lat: 43.70907650443428,
    lng: 15.905708000063894,
    title: "Izlaz",
  },
  {
    kat_id: 10,
    lat: 43.710308876737635,
    lng: 15.904473178088665,
    title: "Prva pomoc",
  },
  {
    kat_id: 6,
    lat: 43.71018111792948,
    lng: 15.904535333999004,
    title: "Top-ups",
  },
  {
    kat_id: 2,
    lat: 43.710115198024035,
    lng: 15.904606412537898,
    title: "Food",
  },
  {
    kat_id: 2,
    lat: 43.71007642157519,
    lng: 15.904646645673122,
    title: "Food",
  },
  {
    kat_id: 4,
    lat: 43.709818557552296,
    lng: 15.904937665351238,
    title: "Shop",
  },
  {
    kat_id: 4,
    lat: 43.70966926734775,
    lng: 15.905095915683116,
    title: "Shop",
  },
  {
    kat_id: 2,
    lat: 43.709614010489446,
    lng: 15.905148218758907,
    title: "Food",
  },
  {
    kat_id: 2,
    lat: 43.70954905938034,
    lng: 15.905211250670757,
    title: "Food",
  },
  {
    kat_id: 2,
    lat: 43.7094821693586,
    lng: 15.905329267867412,
    title: "Food",
  },
  {
    kat_id: 4,
    lat: 43.7093910437016,
    lng: 15.905448626168575,
    title: "Shop",
  },
  {
    kat_id: 4,
    lat: 43.7093251229272,
    lng: 15.90551970470747,
    title: "Shop",
  },
  {
    kat_id: 6,
    lat: 43.70922818048017,
    lng: 15.90563503969511,
    title: "Top-ups",
  },
  {
    kat_id: 5,
    lat: 43.70923690530684,
    lng: 15.90513078440031,
    title: "Drinks",
  },
  {
    kat_id: 1,
    lat: 43.70905271425237,
    lng: 15.904924254306163,
    title: "Aero stage",
  },
  {
    kat_id: 5,
    lat: 43.70971482998215,
    lng: 15.904617141373958,
    title: "Drinks",
  },
  {
    kat_id: 1,
    lat: 43.70936583870821,
    lng: 15.904107521661128,
    title: "Aqua stage",
  },
  {
    kat_id: 5,
    lat: 43.70997657210405,
    lng: 15.904024373181667,
    title: "Drinks",
  },
  {
    kat_id: 5,
    lat: 43.71022086371988,
    lng: 15.903777609952297,
    title: "Drinks",
  },
  {
    kat_id: 1,
    lat: 43.709877691881225,
    lng: 15.903243850358333,
    title: "Terra stage",
  },
  {
    kat_id: 4,
    lat: 43.710275354862986,
    lng: 15.904119984774669,
    title: "Shop",
  },
  {
    kat_id: 4,
    lat: 43.7103800508698,
    lng: 15.903999285368998,
    title: "Shop",
  },
  {
    kat_id: 5,
    lat: 43.71154754742421,
    lng: 15.90255521661994,
    title: "Drinks",
  },
  {
    kat_id: 6,
    lat: 43.711338159306635,
    lng: 15.90278052217719,
    title: "Top-ups",
  },
  {
    kat_id: 3,
    lat: 43.7111985668218,
    lng: 15.902115334341497,
    title: "Kamp",
  },
];

const eventCoord = {
  latitude: 43.710597,
  longitude: 15.903583,
  latitudeDelta: 0.00426,
  longitudeDelta: 0.00426,
};

const festivalArea = [
  { latitude: 43.71112331341447, longitude: 15.90146281189734 },
  { latitude: 43.712526980360124, longitude: 15.904284495781006 },
  { latitude: 43.71298839960717, longitude: 15.904965776870789 },
  { latitude: 43.71253861282179, longitude: 15.905598778198303 },
  { latitude: 43.7116041312083, longitude: 15.904499072502198 },
  { latitude: 43.711140122414626, longitude: 15.903527758513878 },
  { latitude: 43.71044720694375, longitude: 15.904295969788311 },
  { latitude: 43.71046077861972, longitude: 15.904526639763592 },
  { latitude: 43.71039292020907, longitude: 15.904588330570935 },
  { latitude: 43.710286285408515, longitude: 15.904481042210339 },
  { latitude: 43.71022424325541, longitude: 15.904550779644726 },
  { latitude: 43.71022618207368, longitude: 15.90471171218562 },
  { latitude: 43.709305236341606, longitude: 15.905690718476055 },
  { latitude: 43.709221401917155, longitude: 15.905907776280905 },
  { latitude: 43.709585904745545, longitude: 15.906621243878867 },
  { latitude: 43.709543250273754, longitude: 15.906685616895224 },
  { latitude: 43.70867596064054, longitude: 15.905021492981195 },
  { latitude: 43.70932769229774, longitude: 15.904368680225502 },
  { latitude: 43.70903271135924, longitude: 15.903712574981927 },
  { latitude: 43.709981080272854, longitude: 15.90281568120588 },
  { latitude: 43.7104610755346, longitude: 15.903941691009598 },
  { latitude: 43.71110080492651, longitude: 15.903191778229164 },
  { latitude: 43.71048970448912, longitude: 15.901941056965088 },
];

const walkingArea = [
  { latitude: 43.71190480884195, longitude: 15.903055107248031 },
  { latitude: 43.71174582998944, longitude: 15.902760064256393 },
  { latitude: 43.71160236090683, longitude: 15.90283516610881 },
  { latitude: 43.71144532003086, longitude: 15.902856623780929 },
  { latitude: 43.711110879757044, longitude: 15.903183853280746 },
  { latitude: 43.710235994561906, longitude: 15.904224550378524 },
  { latitude: 43.71014365828797, longitude: 15.904036795747482 },
  { latitude: 43.710399945626975, longitude: 15.903819536817275 },
  { latitude: 43.70997746475404, longitude: 15.902831142795288 },
  { latitude: 43.709564584218874, longitude: 15.903216710341178 },
  { latitude: 43.70999408109878, longitude: 15.904232932281696 },
  { latitude: 43.7100711720927, longitude: 15.904132181805574 },
  { latitude: 43.710162065723445, longitude: 15.904317840960823 },
  { latitude: 43.70978872615698, longitude: 15.904673527021908 },
  { latitude: 43.709406232502, longitude: 15.903888457016103 },
  { latitude: 43.70921304590814, longitude: 15.904072596951403 },
  { latitude: 43.70956626484628, longitude: 15.904899592189134 },
  { latitude: 43.709308573176905, longitude: 15.905178979357254 },
  { latitude: 43.70910992821136, longitude: 15.904755409048187 },
  { latitude: 43.70892967445699, longitude: 15.904918964042256 },
  { latitude: 43.70915917708329, longitude: 15.90539998873945 },
  { latitude: 43.709006226719595, longitude: 15.905640816494229 },
  { latitude: 43.70954134905269, longitude: 15.906681513592007 },
  { latitude: 43.70959951423584, longitude: 15.90662250499368 },
  { latitude: 43.70916521283916, longitude: 15.905804431244137 },
  { latitude: 43.70918460136148, longitude: 15.905705189510586 },
  { latitude: 43.71112729949875, longitude: 15.903513824745419 },
  { latitude: 43.71133574894558, longitude: 15.90327641936966 },
  { latitude: 43.711767626145715, longitude: 15.903214043071134 },
  { latitude: 43.711859482722325, longitude: 15.903177490503841 },
  { latitude: 43.71194030869798, longitude: 15.903127027711976 },
];

const camp = [
  { latitude: 43.71112331341447, longitude: 15.90146281189734 },
  { latitude: 43.711788692911036, longitude: 15.902785952804779 },
  { latitude: 43.71162214790387, longitude: 15.902746125601123 },
  { latitude: 43.71141285466976, longitude: 15.902832159255365 },
  { latitude: 43.71110080492651, longitude: 15.903191778229164 },
  { latitude: 43.71048970448912, longitude: 15.901941056965088 },
];

const MapOverlay = () => {
  const [categorySelected, setCategorySelected] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
 const [marker, setMarker] = useState({});

  useEffect(() => {
    (async () => {
      let lat;
      let long;
      let object;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // lat = Number(JSON.stringify(location.coords.latitude));
      // long = Number(JSON.stringify(location.coords.longitude));
      lat = 43.712628;
      long = 15.903729;
      object= { lat: lat, lng: long, title: "Moja lokacija"};
      setMarker(object);
      console.log(marker);
    })();
  }, []);

  const renderAllMarkers = (m, index) => {
    switch (m.kat_id) {
      case 1:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.mainStagePin}
            image={require("../../assets/images/icons/main_stage.png")}
          />
        );

      case 2:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.restaurantPin}
            image={require("../../assets/images/icons/restaurant_marker.png")}
          />
        );

      case 3:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.campPin}
            image={require("../../assets/images/icons/camp_marker.png")}
          />
        );

      case 4:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.shopPin}
            image={require("../../assets/images/icons/shop_marker.png")}
          />
        );

      case 5:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.drinksPin}
            image={require("../../assets/images/icons/drinks_marker.png")}
          />
        );

      case 6:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.topupsPin}
            image={require("../../assets/images/icons/topups_marker.png")}
          />
        );

      case 7:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.enterancePin}
            image={require("../../assets/images/icons/enterance_marker.png")}
          />
        );

      case 8:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.parkingPin}
            image={require("../../assets/images/icons/parking_marker.png")}
          />
        );

      case 9:
        return (
          <CustomMarker
            key={index}
            marker={m}
            color={Colors.themeColor().colors.exitPin}
            image={require("../../assets/images/icons/exit_marker.png")}
          />
        );

      case 10:
        return (
          <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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
            <CustomMarker
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

          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: 43.711071795800706,
              longitude: 15.902187265455721,
            }}
          >
            <Text>KAMP</Text>
          </Marker>

          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: 43.7121713224868,
              longitude: 15.90436153113842,
            }}
          >
            <Text>PARKING</Text>
          </Marker>

          <CustomMarker
              marker={marker}
              color={Colors.themeColor().colors.parkingPin}
              image={require("../../assets/images/icons/myLocation.png")}
            />
          <Polygon
            strokeColor={Colors.themeColor().colors.mapPolygonColor}
            fillColor={Colors.themeColor().colors.transparentPolygonFill}
            strokeWidth={2}
            coordinates={festivalArea}
            // holes={holes}
          ></Polygon>

          <Polygon
            strokeColor={Colors.themeColor().colors.campPolygonStroke}
            fillColor={Colors.themeColor().colors.campPolygon}
            strokeWidth={2}
            coordinates={camp}
          ></Polygon>
          <Polygon
            strokeColor={Colors.themeColor().colors.walkingAreaPolygon}
            fillColor={Colors.themeColor().colors.walkingAreaPolygon}
            strokeWidth={2}
            coordinates={walkingArea}
          ></Polygon>
        </MapView>

        <ScrollView horizontal={true} style={styles.menuContainer}>
          <Pressable
            style={[
              styles.menuIconContainer,
              { backgroundColor: Colors.themeColor().colors.disabledDarkGray },
            ]}
            onPress={() => setCategorySelected(null)}
          >
            <View
              style={[
                categorySelected === null && styles.categorySelected,
                styles.categoryMenuView,
              ]}
            >
              <Text style={[styles.categoryMenuViewText]}>ALL</Text>
            </View>
          </Pressable>
          <Pressable
            style={[
              styles.menuIconContainer,
              {
                backgroundColor: Colors.themeColor().colors.mainStagePin,
              },
            ]}
            onPress={() => setCategorySelected(1)}
          >
            <View
              style={[
                categorySelected === 1 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.restaurantPin },
            ]}
            onPress={() => setCategorySelected(2)}
          >
            <View
              style={[
                categorySelected === 2 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.campPin },
            ]}
            onPress={() => setCategorySelected(3)}
          >
            <View
              style={[
                categorySelected === 3 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.shopPin },
            ]}
            onPress={() => setCategorySelected(4)}
          >
            <View
              style={[
                categorySelected === 4 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.drinksPin },
            ]}
            onPress={() => setCategorySelected(5)}
          >
            <View
              style={[
                categorySelected === 5 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.topupsPin },
            ]}
            onPress={() => setCategorySelected(6)}
          >
            <View
              style={[
                categorySelected === 6 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.enterancePin },
            ]}
            onPress={() => setCategorySelected(7)}
          >
            <View
              style={[
                categorySelected === 7 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.parkingPin },
            ]}
            onPress={() => setCategorySelected(8)}
          >
            <View
              style={[
                categorySelected === 8 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.exitPin },
            ]}
            onPress={() => setCategorySelected(9)}
          >
            <View
              style={[
                categorySelected === 9 && styles.categorySelected,
                styles.categoryMenuView,
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
              { backgroundColor: Colors.themeColor().colors.firstaidPin },
            ]}
            onPress={() => setCategorySelected(10)}
          >
            <View
              style={[
                categorySelected === 10 && styles.categorySelected,
                styles.categoryMenuView,
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
    height: Dimensions.get("window").height,
  },
  menuContainer: {
    flex: 1,
    position: "absolute",
    backgroundColor: Colors.themeColor().colors.primaryTextColor,
    flexDirection: "row",
  },
  menuIconContainer: {
    padding: Typography.FONT_SIZE_TITLE_MD * 0.25,
    justifyContent: "center",
  },
  categorySelected: {
    borderColor: Colors.themeColor().colors.primaryTextColor,
    borderWidth: Typography.FONT_SIZE_TITLE_MD * 0.1,
    borderRadius: Typography.FONT_SIZE_TITLE_MD * 0.75,
  },
  categoryMenuView: {
    padding: Typography.FONT_SIZE_TITLE_MD * 0.15,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  categoryMenuViewIcon: {
    height: Typography.FONT_SIZE_TITLE_MD * 1.5,
    width: Typography.FONT_SIZE_TITLE_MD * 1.5,
    tintColor: Colors.themeColor().colors.primaryTextColor,
  },
  categoryMenuViewText: {
    height: Typography.FONT_SIZE_TITLE_MD * 1.5,
    width: Typography.FONT_SIZE_TITLE_MD * 1.5,
    color: Colors.themeColor().colors.primaryTextColor,
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
  },
  pinSize: {
    height: Typography.FONT_SIZE_TITLE_MD * 1.5,
    width: Typography.FONT_SIZE_TITLE_MD * 1.5,
  },
});

export default MapOverlay;
