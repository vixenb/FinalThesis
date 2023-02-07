/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useContext } from "react";
import {
  VirtualizedList,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import _ from "lodash";
import moment from "moment";
import populateEvents from "./Packer";

import styleConstructor from "./style";

import DayView from "./DayView";
import { Btn, NoDataMessage } from "../../../components/atoms";
import { MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { Colors, SharedStyles, Typography } from "../../../styles";
import { ArtistListItem } from "../../molecules";
import { getTodaysDate } from "../../../helper/format-date-and-time";
import { StoreContext } from "../../../store/reducer";
import { actions, createAction } from "../../../store/actions";
import { localization } from "../../../localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Artists } from "../../../helper";

const EventCalendar = ({
  navigation,
  width,
  virtualizedListProps,
  size,
  events,
  initDate,
  styles1,
  renderEvent,
  eventTapped,
  formatHeader,
  format24h,
  headerStyle,
  scrollToFirst
}) => {
  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  const [date, setDate] = useState(moment(initDate));
  const [index, setIndex] = useState(size);
  const [styles, setStyles] = useState(styleConstructor(styles1));
  const refString = useRef("calendar");
  const [events1, setEvents] = useState(events);
  const [calendar, setCalendar] = useState(true);
  const [timeList, setTimeList] = useState(true);
  const [sceneType, setSceneType] = useState("calendar");

  const onPressLeftButton = () => {
    if (sceneType === "calendar") {
      setSceneType("time");
    } else if (sceneType === "time") {
      setSceneType("calendar");
    } else if (sceneType === "stage") {
      setSceneType("calendar");
    } else { return null; }
  };

  const onPressRightButton = () => {
    if (sceneType === "calendar") {
      setSceneType("stage");
    } else if (sceneType === "time") {
      setSceneType("stage");
    } else if (sceneType === "stage") {
      setSceneType("time");
    } else { return null; }
  };

  EventCalendar.defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: "DD MMMM YYYY"
  };

  // eslint-disable-next-line padded-blocks
  const _getItemLayout = (data, index) => {
    return { length: width, offset: width * index, index };
  };

  const _getItem = (events1, index) => {
    const date = moment(initDate).add(index - size, "days");

    return _.filter(events1, event => {
      const eventStartTime = moment(event.start);

      return eventStartTime >= date.clone().startOf("day") &&
        eventStartTime <= date.clone().endOf("day");
    });
  };

  const getStagesWithEvents = (item) => {
    const stagesWithEvents = [];
    state.stages.map((stage, index) => {
      let helperCounter = 0;

      item.map(event => {
        if (stage.name === event.stage && helperCounter === 0) {
          helperCounter++;
          stagesWithEvents.push(stage);
        }
      });
    });

    return stagesWithEvents;
  };

  const storeAsyncData = async (data) => {
    const key = "@FavouriteArtists";

    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      alert("Error data");
    }
  };

  const addToFavourites = async (item) => {
    const favList = state.favouriteArtists;

    let artistIdExists = false;
    let existingArtistIndex;

    // eslint-disable-next-line array-callback-return
    favList.length !== 0 && favList.map((f, index) => {
      if (f.artistId === item.artistId) {
        artistIdExists = true;
        existingArtistIndex = index;
      }
    });
    if (!artistIdExists) {
      favList.push({ artistId: item.artistId });
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
      if (f.artistId === item.artistId) {
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

  const _renderItemSecond = ({ item, index }) => {
    const packedEvents = populateEvents(item, width);
    const packedEvents2 = populateEvents(item, width);
    const formatTime = "HH:mm";

    const sortedEvents = packedEvents.sort((a, b) =>
      moment(a.start) - moment(b.start)
    );

    // Prikaz po vremenu
    const events = sortedEvents.length === 0 ? <NoDataMessage text={localization("noCurrentData")} /> : sortedEvents.map((event, i) => {
      return (
        <View key={i} style={{ borderBottomColor: Colors.themeColor().colors.empty, borderBottomWidth: 1, marginLeft: 16 }}>
          <ArtistListItem
            name={event.title}
            image={{ uri: event.image }}
            press={() => navigation.navigate("Artist", {
              artistId: event.artistId
            })}
            // eslint-disable-next-line react/no-children-prop
            children={
              <View>
                <Text style={{ color: Colors.themeColor().colors.disabledDarkGray }}>{moment(event.start).format(formatTime)} - {moment(event.end).format(formatTime)}</Text>
                <Text style={{ color: Colors.themeColor().colors.disabledDarkGray }}>{event.stage}</Text>
              </View>
            }
            secondChildren={renderFavouriteStar(event)}
            imageStyle={{
              width: 80,
              height: 80
            }}
            descriptionBox={{
              height: 80,
              justifyContent: "space-between"
            }}
            pressStar={() => addToFavourites(event)}

          />
        </View>
      );
    });

    const eventsByStages = (item) => {
      if (getStagesWithEvents(item).length === 0) {
        return (
          <NoDataMessage text={localization("noCurrentData")} />
        );
      }
      return getStagesWithEvents(item).map((s, index) => {
        return (
          <View key={index}>
            <View style={{ marginHorizontal: 16 }}>
              <Text style={{ color: Colors.themeColor().colors.primary, fontSize: 24 }}>{s.name}</Text>
            </View>
            {
              item.map((event, i) => {
                if (event.stage.toUpperCase() === s.name.toUpperCase()) {
                  return (
                    <View key={i}>
                      <View style={{ borderTopColor: Colors.themeColor().colors.empty, borderTopWidth: 1, marginLeft: 16 }}>
                        <ArtistListItem
                          name={event.title}
                          image={{ uri: event.image }}
                          press={() => navigation.navigate("Artist", {
                            artistId: event.artistId
                          })}
                          // eslint-disable-next-line react/no-children-prop
                          children={
                            <View>
                              <Text style={{ color: Colors.themeColor().colors.disabledDarkGray }}>{moment(event.start).format(formatTime)} - {moment(event.end).format(formatTime)}</Text>
                              <Text style={{ color: Colors.themeColor().colors.disabledDarkGray }}>{event.stage}</Text>
                            </View>
                          }
                          secondChildren={
                            renderFavouriteStar(event)

                          }
                          imageStyle={{
                            width: 80,
                            height: 80
                          }}
                          descriptionBox={{
                            height: 80,
                            justifyContent: "space-between"
                          }}
                          pressStar={() => addToFavourites(event)}
                        />
                      </View>
                    </View>
                  );
                }
              })
            }
          </View>
        );
      });
    };

    return (
      <View style={[
        SharedStyles.layout.containerBlack,
        { paddingTop: 16, width: width }
      ]}
      >
        <SafeAreaView style={SharedStyles.layout.flex}>
          <View>
            <ScrollView>
              {
                sceneType === "time" ? events : eventsByStages(item)
              }
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  const _renderItem = ({ index, item }) => {
    const date = moment(initDate).add(index - size, "days");

    return (
      <DayView
        date={date}
        index={index}
        format24h={format24h}
        formatHeader={formatHeader}
        headerStyle={headerStyle}
        renderEvent={renderEvent}
        eventTapped={eventTapped}
        events={item}
        width={width}
        styles={styles}
        scrollToFirst={scrollToFirst}
      />
    );
  };

  const _goToPage = (index) => {
    if (index <= 0 || index >= size * 2) {
      return;
    }
    const date = moment(initDate).add(index - size, "days");
    refString.current.scrollToIndex({ index, animated: false });
    setIndex(index);
    setDate(date);
  };

  return (
    <View style={[styles.container, { width: width, backgroundColor: sceneType === "calendar" ? "white" : "black" }]}>

      <View style={[
        styles.header,
        SharedStyles.layout.standardHorizontalPadding
      ]}>
        <Btn
          // Go to prevous page -> press={() => _goToPage(index - 1)}
          press={onPressLeftButton}
        >
          {
            sceneType === "calendar" ? <Feather
              name="clock"
              size={Typography.FONT_SIZE_TITLE_MD * 1.5}
              color={Colors.themeColor().colors.primaryTextColor} /> : <MaterialCommunityIcons
              name="calendar-clock"
              size={Typography.FONT_SIZE_TITLE_MD * 1.5}
              color={Colors.themeColor().colors.primaryTextColor} />
          }
        </Btn>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Btn
            press={() => _goToPage(index - 1)}>
            <MaterialIcons
              name="navigate-before"
              size={Typography.FONT_SIZE_TITLE_MD * 1.8}
              color={Colors.themeColor().colors.primaryTextColor} />
          </Btn>
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>{date.format(formatHeader || "DD MMMM YYYY")}</Text>
          </View>
          <Btn
            press={() => _goToPage(index + 1)}>
            <MaterialIcons
              name="navigate-next"
              size={Typography.FONT_SIZE_TITLE_MD * 1.8}
              color={Colors.themeColor().colors.primaryTextColor} />
          </Btn>
        </View>
        <Btn
          press={onPressRightButton}>
          {sceneType === "stage" ? <Feather
            name="clock"
            size={Typography.FONT_SIZE_TITLE_MD * 1.5}
            color={Colors.themeColor().colors.primaryTextColor} /> : <Image
            source={require("../../../assets/images/icons/main_stage.png")}
            style={{
              width: Typography.FONT_SIZE_TITLE_MD * 1.4,
              height: Typography.FONT_SIZE_TITLE_MD * 1.4,
              tintColor: Colors.themeColor().colors.primaryTextColor
            }} />
          }
        </Btn>
      </View>

      <VirtualizedList
        ref={refString}
        windowSize={1}
        initialNumToRender={2}
        initialScrollIndex={size}
        data={events1}
        getItemCount={() => size * 2}
        getItem={_getItem}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={_getItemLayout}
        horizontal
        pagingEnabled
        renderItem={sceneType === "calendar" ? _renderItem : _renderItemSecond}
        style={{ width: width }}
        onMomentumScrollEnd={(event) => {
          const index = parseInt(event.nativeEvent.contentOffset.x / width + 0.1);
          const date = moment(initDate).add(index - size, "days");
          setDate(date);
          setIndex(index);
        }}
        scrollEnabled={false}
        {...virtualizedListProps}
      />
    </View>

  );
};

export default EventCalendar;
