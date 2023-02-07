/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Pressable, View, Text, SafeAreaView, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator, Divider } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { Btn } from "../../components/atoms";

//  Localization
import { localization } from "../../localization";

//  Styles
import { Colors, SharedStyles, Typography } from "../../styles";
import { FONT_SIZE_TITLE_MD, LINE_HEIGHT_TITLE_LG } from "../../styles/typography";

// Endpoints
import { Events } from "../../endpoints";

// Store
import { StoreContext } from "../../store/reducer";
import { actions, createAction } from "../../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Artists } from "../../helper";

// Components
import { ArtistSchedule } from "../../components/molecules";

const windowWidth = Dimensions.get("window").width;

const Artist = ({ navigation, route }) => {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const state = store.state;

  const artistId = route.params.artistId;
  const [selectedArtist, setSelectedArtist] = useState();

  useEffect(() => {
    dispatch(createAction(actions.START_LOADER));

    const getSelectedArtist = async () => {
      await Events.getArtistDetails(artistId)
        .then((json) => {
          setSelectedArtist(json.data.artist);
        })
        .finally(() => {
          dispatch(createAction(actions.END_LOADER));
        });
    };
    getSelectedArtist();
  }, []);

  const storeAsyncData = async (data) => {
    const key = "@FavouriteArtists";
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      alert("Error data");
    }
  };

  const addToFavourites = (item) => {
    const favList = state.favouriteArtists;

    let artistIdExists = false;
    let existingArtistIndex;
    // eslint-disable-next-line array-callback-return
    favList.length !== 0 && favList.map((f, index) => {
      if (f.artistId === item.id) {
        artistIdExists = true;
        existingArtistIndex = index;
      }
    });
    if (!artistIdExists) {
      favList.push({ artistId: item.id });
    } else {
      favList.splice(existingArtistIndex, 1);
    }

    dispatch(createAction(actions.SET_FAVOURITES, favList));

    storeAsyncData(favList);

    const customArtists = Artists.setFavourites(state.artists, state.favouriteArtists);

    dispatch(createAction(actions.SET_ARTISTS, customArtists));
  };

  const renderFavouriteStar = (item) => {
    let helper = 0;

    // eslint-disable-next-line array-callback-return
    const star = state.favouriteArtists.map((f, index) => {
      if (f.artistId === item.id) {
        helper++;
        return (
          <FontAwesome key={index} name={ "star" } size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor().colors.primaryTextColor} />
        );
      }
    });

    if (helper !== 0) {
      return (star);
    }
    return (
      <FontAwesome name={ "star-o"} size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor().colors.primaryTextColor} />
    );
  };

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.themeColor().colors.primary} />
      </View>
    );
  }

  if (selectedArtist !== undefined) {
    return (
      <ScrollView
        style={[
          SharedStyles.layout.containerBlack,
          {
            backgroundColor: Colors.themeColor().colors.primaryBackgroundColor
          }]}
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={false}
      >

        <View style={SharedStyles.typography.flex}>
          <View style={[
            styles.topBox,
            SharedStyles.layout.standardVerticalPadding
          ]}>
            <Image source={{ uri: selectedArtist.img }} style={styles.boxImage} />
            <View style={[
              styles.header
            ]}>
              <View style={styles.mainHeader}>
                <Text style={styles.mainHeaderLabel}>{selectedArtist.name}</Text>
                <Pressable
                  onPress={() => addToFavourites(selectedArtist)}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
                    },
                    styles.mainHeaderStar
                  ]}>
                  {
                    // eslint-disable-next-line array-callback-return
                    renderFavouriteStar(selectedArtist)
                  }
                </Pressable>
              </View>

              <ScrollView horizontal={true}>
                {
                  selectedArtist.schedule.map((s, index) => (
                    <ArtistSchedule key={index} index={index} schedule={s} selectedArtist={selectedArtist} />
                  ))
                }
              </ScrollView>

            </View>
          </View>
          <View style={[
            styles.paragraph
          ]}>
            <View style={[
              SharedStyles.layout.standardVerticalPadding
            ]}>
              <Text style={SharedStyles.typography.subtitile}>
                {selectedArtist.about}
              </Text>
            </View>
            <View style={[
              styles.linkBox
            ]}>

              {
                selectedArtist.links.length !== 0 &&
                  <Text style={styles.linkText}>{localization("links")}</Text>

              }

              {
                selectedArtist.links.Web !== undefined &&
                  <Btn
                    press={() => navigation.navigate("Browser", {
                      link: selectedArtist.links.Web
                    })}
                    style={[
                      styles.linksIcon,
                      SharedStyles.typography.centeredItem
                    ]}
                  >
                    <MaterialCommunityIcons name="web" size={FONT_SIZE_TITLE_MD * 2} color={Colors.themeColor().colors.facebookBlue} />
                  </Btn>
              }

              {
                selectedArtist.links.Facebook !== undefined &&
                  <Btn
                    press={() => navigation.navigate("Browser", {
                      link: selectedArtist.links.Facebook
                    })}
                    style={[
                      styles.linksIcon,
                      SharedStyles.typography.centeredItem
                    ]}
                  >
                    <FontAwesome name="facebook-square" size={FONT_SIZE_TITLE_MD * 2} color={Colors.themeColor().colors.facebookBlue} />
                  </Btn>
              }

              {
                selectedArtist.links.Instagram !== undefined &&
                   <Btn
                     press={() => navigation.navigate("Browser", {
                       link: selectedArtist.links.Instagram
                     })}
                     style={[
                       styles.linksIcon,
                       SharedStyles.typography.centeredItem
                     ]}
                   >
                     <FontAwesome name="instagram" size={FONT_SIZE_TITLE_MD * 2} color={Colors.themeColor().colors.youtubeRed} />
                   </Btn>
              }

              {
                selectedArtist.links.Youtube !== undefined && <Btn
                  press={() => navigation.navigate("Browser", {
                    link: selectedArtist.links.Youtube
                  })}
                  style={[
                    styles.linksIcon,
                    SharedStyles.typography.centeredItem
                  ]}
                >
                  <FontAwesome name="youtube-play" size={FONT_SIZE_TITLE_MD * 2} color={Colors.themeColor().colors.youtubeRed} />
                </Btn>
              }

            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.themeColor().colors.primary} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  topBox: {
    backgroundColor: Colors.themeColor().colors.secondaryBackgroundColor
  },
  boxImage: {
    width: windowWidth - 64,
    height: 250,
    alignSelf: "center",
    resizeMode: "cover"
  },
  header: {
    paddingTop: 15,
    // 32 jer je sirina slike umanjena za 32 sa svake strane screen-a
    paddingHorizontal: 32
  },
  mainHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  mainHeaderLabel: {
    fontWeight: "bold",
    fontSize: Typography.FONT_SIZE_TITLE_LG,
    color: Colors.themeColor().colors.primaryTextColor,
    textTransform: "uppercase"
  },
  mainHeaderStar: {
    position: "absolute",
    right: Typography.FONT_SIZE_TITLE_MD * 0.25
  },
  subHeader: {
    marginTop: Typography.FONT_SIZE_TITLE_MD * 0.25
  },
  subHeaderLabel: {
    fontSize: Typography.FONT_SIZE_EXTRA_SMALL,
    color: Colors.themeColor().colors.primaryTextColor,
    opacity: 0.7,
    fontWeight: "700"
  },
  paragraph: {
    backgroundColor: Colors.themeColor().colors.primaryBackgroundColor,
    paddingHorizontal: LINE_HEIGHT_TITLE_LG,
    paddingBottom: LINE_HEIGHT_TITLE_LG
  },
  linksIcon: {
    width: FONT_SIZE_TITLE_MD * 2,
    height: FONT_SIZE_TITLE_MD * 2,
    marginRight: Typography.FONT_SIZE_TITLE_MD * 0.5
  },
  linkBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  linkText: {
    marginRight: Typography.FONT_SIZE_TITLE_MD * 0.5,
    fontSize: Typography.FONT_SIZE_TITLE_MD
  }
});

export default Artist;
