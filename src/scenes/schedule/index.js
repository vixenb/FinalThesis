import React, { useContext, useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions, StyleSheet, Image } from "react-native";

// Icons
import { Entypo, FontAwesome } from "@expo/vector-icons";

// Moment
import moment from "moment";

// Styles
import { Colors, SharedStyles, Typography } from "../../styles";

// store
import { StoreContext } from "../../store/reducer";
import { localization } from "../../localization";

// Components
import { EventCalendar } from "../../components/organisms";
import { Btn, NoDataMessage } from "../../components/atoms";

// helpers
import { DateFormat } from "../../helper";

const { width } = Dimensions.get("window");

// Primjer liste objekata koji se salju na EventCalendar.js
const events = [
  { key: "0", start: "2021-02-23 09:00:00", end: "2021-02-23 11:00:00", title: "Actress", stage: "Other", image: require("../../assets/images/artists-bw/actressCB.png"), favorites: "true" }
];

const Schedule = ({ navigation }) => {
  const store = useContext(StoreContext);
  const state = store.state;

  const formatEvents = () => {
    let formatedEvent;
    const formatedEvents = [];

    // eslint-disable-next-line array-callback-return
    state.schedule.map((event, index) => {
      // eslint-disable-next-line array-callback-return
      state.artists.map((artist) => {
        if (artist.id === event.artist_id) {
          formatedEvent = {
            artistId: artist.id,
            key: event.id,
            start: event.date_from,
            end: event.date_to,
            title: event.Artist.name,
            stage: event.Stage.stage1,
            image: artist.image,
            favourites: artist.isFavourite
          };
          formatedEvents.push(formatedEvent);
        }
      });
    });
    console.log(formatedEvents);
    return formatedEvents;
  };

  useEffect(()=> {
    formatEvents();
  },[])

  const renderFavouriteStar = (item) => {
    let helper = 0;
    // eslint-disable-next-line array-callback-return
    const star = state.favouriteArtists.map((f, index) => {
      if (f.artistId === item.artistId) {
        helper++;
        return (
          <FontAwesome key={index} name={ "star" } size={Typography.FONT_SIZE_TITLE_LG} color={Colors.themeColor().colors.primaryTextColor} style={{ position: "absolute", right: 10, bottom: 10 }}/>
        );
      }
    });

    if (helper !== 0) {
      return (star);
    }
    return (
      null
    );
  };

  const renderFavouriteEventBG = (item) => {
    let helper = 0;
    let style = null;
    // eslint-disable-next-line array-callback-return
    const star = state.favouriteArtists.map((f, index) => {
      if (f.artistId === item.artistId) {
        helper++;
        style = { backgroundColor: Colors.themeColor().colors.favoriteEventBackground };
        return style;
      }
    });

    if (helper !== 0) {
      return (star);
    }
    return style;
  };

  if (formatEvents().length === 0) {
    return (
      <View style={{ marginTop: Typography.FONT_SIZE_TITLE_MD }}>
        <NoDataMessage text={localization("noCurrentData")} />
      </View>
    );
  }

  return (
    <SafeAreaView style={SharedStyles.layout.flex}>
      <EventCalendar
        navigation={navigation}
        format24={true}
        events={formatEvents()}
        width={width}
        initDate={DateFormat.getTodaysDate()}
        formatHeader={"ddd DD.MM"}
        size={3}
        headerIconLeft={
          <Btn
            press={() => console.log("Otvara se list view raspored-a")}>
            <Entypo
              name="list"
              size={Typography.FONT_SIZE_TITLE_MD * 2}
              color={Colors.themeColor().colors.primaryTextColor} />
          </Btn>
        }
        styles1={{
          header: {
            backgroundColor: Colors.themeColor().colors.primaryTouchable,
            borderTopWidth: 0
          },
          headerBox: {
            paddingBottom: 2,
            marginHorizontal: Typography.FONT_SIZE_NORMAL
          },
          headerText: {
            color: Colors.themeColor().colors.primaryTextColor,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
            fontSize: Typography.FONT_SIZE_MEDIUM,
            textTransform: "uppercase"
          },
          event: {
            paddingLeft: 0,
            paddingTop: 0
          }
        }}
        renderEvent={(event) => {
          return (
            <View style={[
              styles.event,
              renderFavouriteEventBG(event)
            ]}>
              <View style={{ flexDirection: "row", paddingHorizontal: 2, paddingVertical: 2 }}>
                <Image source={{ uri: event.image }} style={{ width: 60, height: 60, resizeMode: "cover", borderWidth: 1, borderColor: "white" }} />
                <View style={{ paddingHorizontal: 8, flex: 2 }}>
                  <Text style={[
                    SharedStyles.typography.uppercase,
                    {
                      fontWeight: Typography.FONT_WEIGHT_BOLD,
                      color: Colors.themeColor().colors.secondaryTextColor
                    }
                  ]}>
                    {event.title}
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text style={[
                      {
                        fontSize: Typography.FONT_SIZE_EXTRA_SMALL,
                        color: Colors.themeColor().colors.primaryTextColor,
                        fontWeight: "bold"
                      }
                    ]}>
                      {`${moment(event.start).format("HH:mm")} - ${moment(event.end).format("HH:mm")}`}
                    </Text>
                    <Text style={[
                      {
                        fontSize: Typography.FONT_SIZE_EXTRA_SMALL,
                        color: Colors.themeColor().colors.primaryTextColor,
                        fontWeight: Typography.FONT_WEIGHT_BOLD,
                        textTransform: "uppercase"
                      }
                    ]}>
                      {event.stage}
                    </Text>
                  </View>

                </View>
              </View>

              {
                renderFavouriteStar(event)
              }
            </View>

          );
        }
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  event: {
    width: "100%",
    height: "100%",
    paddingLeft: 5,
    paddingTop: 5
  }
});

export default Schedule;
