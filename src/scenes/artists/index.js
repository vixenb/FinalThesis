import React, { useState, useEffect, useContext } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TextInput,
  ActivityIndicator
} from "react-native";

import filter from "lodash.filter";
import { AlphabetList } from "react-native-section-alphabet-list";

//  Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import { ArtistGridItem, ArtistListItem, EmptySpace } from "../../components/molecules";

//  Styles
import { Colors, SharedStyles, Typography } from "../../styles";

// Components
import { Btn } from "../../components/atoms";

//  Vector icon
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";

//  Helpers
import { DeepLink, Artists as ArtistsFunction } from "../../helper";

// store
import { StoreContext } from "../../store/reducer";

// Actions
import { actions, createAction } from "../../store/actions";

const Artists = ({ navigation }) => {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const state = store.state;

  const key = "@FavouriteArtists";

  const [grid, setGrid] = useState(true);
  const [query, setQuery] = useState("");
  const [artistsData, setArtistsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setArtistsData(state.artists);
  }, []);

  const storeAsyncData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      alert("Error data");
    }
  };

  const openCashless = () => {
    DeepLink.openLink({
      cashlessLink: "ewalletcashlessdemo://",
      appName: "eWallet cashless demo",
      appStoreId: "us",
      playStoreId: "com.mstart.ewallet_cashless_demo"
    });
  };

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(state.artists, user => {
      return contains(user, formattedQuery);
    });
    setQuery(text);
    setArtistsData(filteredData);

    if (filteredData.length === 0) {
      setEmpty(true);
    } else setEmpty(false);
  };

  const contains = ({ value }, query) => {
    if (value.includes(query)) {
      return true;
    }
    return false;
  };

  const renderGridItem = ({ item }) => (
    <ArtistGridItem
      name={item.name}
      img={{ uri: item.image }}
      press={() => navigation.navigate("Artist",
        {
          artistId: item.id
        }
      )}
    />
  );

  useEffect(()=> {
    console.log(state.stages);
  })
  const onPressLeftButton = () => {
    setGrid(true);
  };

  const onPressRightButton = () => {
    setGrid(false);
  };

  const addToFavourites = async (item) => {
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

    const customArtists = ArtistsFunction.setFavourites(state.artists, state.favouriteArtists);

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

  return (
    <View style={SharedStyles.layout.containerBlack}>
      <SafeAreaView style={SharedStyles.layout.flex}>
        <View style={[
          styles.subHeader,
          SharedStyles.layout.standardHorizontalPadding
        ]}>
          <View style={styles.inputContainer}>

            <View style={styles.inputBox}>
              < MaterialIcons name="search" size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor().colors.primaryTextColor} />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                name={query}
                onChangeText={(queryText) => {
                  setLoader(true);
                  handleSearch(queryText);
                  setTimeout(() => {
                    setLoader(false);
                  }, 1000);
                }}
                placeholder="Search ..."
                placeholderTextColor={Colors.themeColor().colors.primaryTextColor}
                style={styles.textInput}

              />
            </View>
          </View>
          {
            grid ? (
              <Btn
                press={onPressRightButton}>
                <Entypo
                  name="list"
                  size={Typography.FONT_SIZE_TITLE_MD * 1.7}
                  color={Colors.themeColor().colors.primaryTextColor} />
              </Btn>
            ) : (
              <Btn
                press={onPressLeftButton}>
                <Entypo
                  name="grid"
                  size={Typography.FONT_SIZE_TITLE_MD * 1.8}
                  color={Colors.themeColor().colors.primaryTextColor} />
              </Btn>
            )
          }
        </View>

        {loader ? <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator
            size={Typography.LINE_HEIGHT_TITLE_LG * 1.5}
            color={Colors.themeColor().colors.primary}
          />
        </View> : grid ? (
          empty ? <EmptySpace
            icon={<Image source={require("../../assets/images/icons/not-found.png")} style={{ resizeMode: "cover", width: 150, height: 150, tintColor: Colors.themeColor().colors.primary }} />}
            headerLabel={"Whoops!"}
            headerStyle={{ color: Colors.themeColor().colors.primaryTextColor, paddingVertical: 16 }}
            descriptionLabel={[
              "Sorry, but nothing matched your search.",
              "\n",
              "Please try some different keywoards."
            ]}

          /> : <View style={styles.table}>
            <FlatList
              data={artistsData}
              renderItem={renderGridItem}
              keyExtractor={(item, index) => index}
              numColumns={2}
            />
          </View>
        ) : (
          empty ? <EmptySpace
            icon={<Image source={require("../../assets/images/icons/not-found.png")} style={{ resizeMode: "cover", width: 150, height: 150, tintColor: Colors.themeColor().colors.primary }} />}
            headerLabel={"Whoops!"}
            headerStyle={{ color: Colors.themeColor().colors.primaryTextColor, paddingVertical: 16 }}
            descriptionLabel={[
              "Sorry, but nothing matched your search.",
              "\n",
              "Please try some different keywoards."
            ]}
          /> : <View style={styles.listContainer}>
            <AlphabetList
              data={artistsData}
              indexLetterColor={Colors.themeColor().colors.primary}
              renderCustomItem={(item) => (
                <View style={{ marginRight: 0 }}>
                  <ArtistListItem
                    name={item.name}
                    image={{ uri: item.image }}
                    press={() => navigation.navigate("Artist", {

                      artistId: item.id
                    })}
                    pressStar={() => {
                      addToFavourites(item);
                    }}
                    secondChildren={
                      renderFavouriteStar(item)
                    }
                  />
                </View>
              )}
              renderCustomSectionHeader={(section) => (
                <Text style={styles.header}>{section.title}</Text>
              )}
            />
          </View>
        )
        }
      </SafeAreaView>
      <Btn
        press={openCashless}
        btncolor={Colors.themeColor().colors.primary}
        btnpresscolor={Colors.themeColor().colors.primaryTouchable}
        style={[
          SharedStyles.buttons.cashlessButton,
          SharedStyles.shadow.elevation6
        ]}>
        <Entypo name="wallet" size={35} color={Colors.themeColor().colors.secondary} />
      </Btn>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginBottom: 50
  },
  typeView: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: Typography.FONT_SIZE_TITLE_LG,
    marginLeft: 5,
    backgroundColor: "transparent",
    color: Colors.themeColor().colors.primaryTextColor,
    borderBottomWidth: 1,
    borderColor: Colors.themeColor().colors.empty
  },
  subHeader: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.themeColor().colors.primaryTouchable
  },
  listContainer: {
    paddingLeft: 8,
    paddingTop: 8,
    marginBottom: 50
  },
  inputBox: {
    flexDirection: "row",
    backgroundColor: Colors.themeColor().colors.primaryInput,
    opacity: 0.9,
    paddingHorizontal: 5,
    height: "90%",
    borderRadius: 10,
    alignItems: "center"
  },
  inputContainer: {
    marginLeft: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textInput: {
    paddingLeft: 10,
    width: 230,
    fontSize: Typography.FONT_SIZE_SMALL,
    color: Colors.themeColor().colors.primaryTextColor
  }
});

export default Artists;
