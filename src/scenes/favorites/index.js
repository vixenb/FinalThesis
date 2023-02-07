import React, { useContext } from "react";
import { Pressable, View, Text, SafeAreaView, StyleSheet, FlatList, Share } from "react-native";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

// Localization
import { localization } from "../../localization";

// Styles
import { Colors, SharedStyles, Typography } from "../../styles";
import { EmptySpace } from "../../components/molecules";
import { StoreContext } from "../../store/reducer";

// File System
import * as FileSystem from "expo-file-system";
// Components
import FavouriteArtistItem from "../../components/molecules/favourite-artist";
// import moment from "moment";

// Expo sharing
// import * as Sharing from "expo-sharing";

// const formatTime = "HH:mm";

// const Item = ({ title, date, startTime, endTime, stage, img, press }) => (

//   <Pressable
//     onPress={press}
//     style={({ pressed }) => [
//       {
//         opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
//       },
//       styles.itemContainer
//     ]}>

//     <View style={styles.rows}>
//       <View>
//         <Image source={img} style={styles.boxImage} />
//       </View>
//       <View style={styles.secondRow}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>{title}</Text>
//         </View>
//         <View style={styles.subHeader}>
//           <Text style={styles.subHeaderText}>{moment(date).format("dddd")}</Text>
//           <Text style={styles.subHeaderText}>{moment(startTime).format(formatTime)} - {moment(endTime).format(formatTime)}</Text>
//           <Text style={styles.subHeaderText}>{stage}</Text>
//         </View>
//       </View>
//     </View>
//   </Pressable>
// );

const Favorites = ({ navigation }) => {
  const store = useContext(StoreContext);
  const state = store.state;
  let sharedText = "";

  const getFavouriteArtists = () => {
    const favourites = [];
    let shareLabel = "Na festivalu SuperUho nastupaju i moji omiljeni izvodjaci:";

    // eslint-disable-next-line array-callback-return
    state.artists.map(a => {
      if (a.isFavourite) {
        favourites.push(a);
        shareLabel = shareLabel + a.name + ",";
      }
    });
    sharedText = shareLabel.slice(0, -1);
    return favourites;
  };

  const onShare = () => {
    const data = getFavouriteArtists();
    const img = data[0].thumb;

    FileSystem.downloadAsync(
      img,
      FileSystem.documentDirectory + ".png"
    )
      .then(async ({ uri }) => {
        // Dijeljenje poruke
        await Share.share({ message: sharedText, url: uri });

        // Dijeljenje slike izvodjaca
        //
        // const options = {
        //   mimeType: "image/png",
        //   dialogTitle: "Super Uho!"
        // };
        // await Sharing.shareAsync(uri, options);
      });
  };

  const rendererItem = ({ item }) => {
    const artistSchedule = [];
    // eslint-disable-next-line array-callback-return
    state.schedule.map((s) => {
      if (item.name.toUpperCase() === s.artist.toUpperCase()) {
        artistSchedule.push(s);
      }
    });

    const formatedArtist = {
      ...item,
      schedule: artistSchedule
    };

    return (
      // TODO:
      // Vidjeti koje su vrijednosti potrebne kod prikaza favorita
      <FavouriteArtistItem
        artist={formatedArtist}
        schedule={artistSchedule}
        press={() => navigation.push("Artist", {
          artistId: item.id
        })}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.themeColor().colors.primaryBackgroundColor, paddingBottom: 70 }}>

      {getFavouriteArtists().length !== 0 ? <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          data={getFavouriteArtists()}
          renderItem={rendererItem}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.buttonBox}>
          <Pressable
            onPress={onShare}
            style={({ pressed }) => [

              {
                opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
              },
              styles.button
            ]}>
            <Entypo name="share" size={25} color={Colors.themeColor().colors.primaryBackgroundColor} />
            <Text style={[styles.buttonText, SharedStyles.typography.uppercase]}>{localization("share")}</Text>
          </Pressable>
        </View>
      </View> : <EmptySpace
        icon={<MaterialCommunityIcons name="heart-broken" size={200} color={Colors.themeColor().colors.disabledGray} />}
        headerLabel={"No favorites yet!"}
        descriptionLabel={["Press ", <FontAwesome key={1} name="star-o" size={Typography.FONT_SIZE_SMALL} color={Colors.themeColor().colors.empty} />, " to add an item to favorites"]}
      />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    width: 110,
    paddingVertical: 10,
    backgroundColor: Colors.themeColor().colors.primary,
    borderColor: Colors.themeColor().colors.primary
  },
  buttonText: {
    marginLeft: 10,
    color: Colors.themeColor().colors.primaryTextColor
  },
  buttonBox: {
    marginTop: 15
  }
});

export default Favorites;
