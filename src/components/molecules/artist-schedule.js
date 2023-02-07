import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Shared styles
import { Colors, Typography } from "../../styles";

const ArtistSchedule = ({ index, schedule, selectedArtist, textColor = Colors.themeColor().colors.primaryTextColor, nextPerformance = null }) => {
  if (nextPerformance !== null) {
    return (
      <View style={{ flexDirection: "row" }} >
        <View style={{ marginRight: Typography.FONT_SIZE_TITLE_MD * 0.5 }}>
          <Text style={[styles.subHeaderLabel, { color: textColor }]}>{nextPerformance.date_from.substr(0, 10)}.</Text>
          <Text style={[styles.subHeaderLabel, { color: textColor }]}>{nextPerformance.date_from.substr(11, 5)} - {nextPerformance.date_to.substr(11, 5)}</Text>
          <Text numberOfLines={1} style={[styles.subHeaderLabel, { width: Typography.FONT_SIZE_TITLE_MD * 4, color: textColor }]}>{nextPerformance.stage}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.subHeader, { flexDirection: "row", paddingHorizontal: Typography.FONT_SIZE_TITLE_MD * 0.25 }]} >

      <View style={{ marginRight: Typography.FONT_SIZE_TITLE_MD * 0.5 }}>
        <Text style={[styles.subHeaderLabel, { color: textColor }]}>{schedule.date_from.substr(0, 10)}.</Text>
        <Text style={[styles.subHeaderLabel, { color: textColor }]}>{schedule.date_from.substr(11, 5)} - {schedule.date_to.substr(11, 5)}</Text>
        <Text numberOfLines={1} style={[styles.subHeaderLabel, { width: Typography.FONT_SIZE_TITLE_MD * 4, color: textColor }]}>{schedule.stage}</Text>
      </View>

      {
        (selectedArtist.schedule.length > 1 && selectedArtist.schedule.length - 1 !== index) && (
          <View style={{ backgroundColor: Colors.themeColor().colors.primaryBackgroundColor, width: 1, height: Typography.FONT_SIZE_TITLE_MD * 2.5 }}></View>
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({

  subHeader: {
    marginTop: Typography.FONT_SIZE_TITLE_MD * 0.25
  },
  subHeaderLabel: {
    fontSize: Typography.FONT_SIZE_EXTRA_SMALL,
    color: Colors.themeColor().colors.secondaryTextColor,
    opacity: 0.7,
    fontWeight: "700"
  }
});

export default ArtistSchedule;
