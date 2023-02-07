import React from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";

// Shared stylex
import { Colors, Typography } from "../../styles";

// Components
import { ArtistSchedule } from "../molecules";

// helper
import { DateFormat } from "../../helper";
import { localization } from "../../localization";

const FavouriteArtistItem = ({ artist, schedule, press }) => {
  const today = `${DateFormat.formatDate(DateFormat.getTodaysDate())} ${DateFormat.getCurrentTIme()}`;

  const getNextPerformance = () => {
    let nextPerformance;
    let helper = 0;

    schedule.sort((s1, s2) => s1.date_from > s2.date_from);

    schedule.forEach((s) => {
      const performanceDate = `${s.date_from.substr(0, 10)}. ${s.date_from.substr(11, 5)}`;

      if (helper !== 0) {
        return;
      }

      if (today < performanceDate) {
        nextPerformance = s;
        helper++;
      } else {
        nextPerformance = s;
      }
    });

    return nextPerformance;
  };

  const compareDates = () => {
    const lastPerformance = localization("lastPerformance");
    const nextPerformance = localization("nextPerformance");
    const artistPerformance = getNextPerformance();
    const performanceDateStart = `${artistPerformance.date_from.substr(0, 10)}. ${artistPerformance.date_from.substr(11, 5)}`;

    if (today < performanceDateStart) {
      return nextPerformance;
    } else {
      return lastPerformance;
    }
  };

  return (
    <Pressable
      onPress={press}
      style={({ pressed }) => [
        {
          opacity: pressed ? Colors.TOUCHABLE_OPACITY : 1
        },
        styles.itemContainer
      ]}>

      <View style={styles.rows}>
        <View>
          <Image source={{ uri: artist.thumb }} style={styles.boxImage} />
        </View>
        <View style={styles.secondRow}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{artist.name}</Text>
          </View>
          <View style={styles.subHeader} >
            <View >
              <Text style={styles.subHeaderLabel}>{ compareDates() }</Text>
              <ArtistSchedule schedule={schedule} selectedArtist={artist} textColor={Colors.themeColor().colors.secondaryTextColor} nextPerformance={getNextPerformance()} />
            </View>

          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default FavouriteArtistItem;

const styles = StyleSheet.create({
  boxImage: {
    resizeMode: "cover",
    width: Typography.FONT_SIZE_TITLE_MD * 5,
    height: Typography.FONT_SIZE_TITLE_MD * 5
  },
  rows: {
    flexDirection: "row"
  },
  secondRow: {
    marginLeft: Typography.FONT_SIZE_TITLE_MD,
    flex: 1
  },
  subHeaderText: {
    fontSize: Typography.FONT_SIZE_EXTRA_SMALL
  },
  headerText: {
    fontWeight: "bold",
    fontSize: Typography.FONT_SIZE_NORMAL,
    textTransform: "uppercase"
  },
  subHeader: {
    paddingTop: Typography.LINE_HEIGHT_TITLE_MD * 0.25
  },
  itemContainer: {
    marginTop: Typography.LINE_HEIGHT_TITLE_MD
  },
  subHeaderLabel: {
    fontSize: Typography.FONT_SIZE_EXTRA_SMALL,
    color: Colors.themeColor().colors.secondaryTextColor,
    opacity: 0.7,
    fontWeight: "700"
  }

});
