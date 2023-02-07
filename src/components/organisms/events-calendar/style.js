// @flow
import { Platform, StyleSheet } from "react-native";
import { Colors, Typography } from "../../../styles";

const calendarHeight = 2400;
const leftMargin = 50 - 1;

const styleConstructor = (theme = {}) => {
  const style = {
    container: {
      flex: 1,
      ...theme.container
    },
    contentStyle: {
      backgroundColor: Colors.themeColor().colors.primaryBackgroundColor,
      height: calendarHeight + 10
    },
    header: {
      height: 50,
      borderTopWidth: 1,
      borderColor: "#E6E8F0",
      backgroundColor: "#F5F5F6",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      ...theme.header
    },
    headerText: {
      fontSize: 16,
      ...theme.headerText
    },
    headerBox: {
      ...theme.headerBox
    },
    arrow: {
      width: 15,
      height: 15,
      resizeMode: "contain",
      ...theme.arrow
    },
    event: {
      position: "absolute",
      backgroundColor: "#F0F4FF",
      opacity: 1,
      borderColor: "#DDE5FD",
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 4,
      minHeight: 25,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 0,
      flexDirection: "column",
      alignItems: "flex-start",
      overflow: "hidden",
      ...theme.event
    },
    eventTitle: {
      color: "#615B73",
      fontWeight: Typography.FONT_WEIGHT_NORMAL,
      minHeight: 15,
      ...theme.eventTitle
    },
    eventSummary: {
      color: "#615B73",
      fontSize: Typography.FONT_SIZE_EXTRA_SMALL,
      flexWrap: "wrap",
      ...theme.eventSummary
    },
    eventTimes: {
      marginTop: 3,
      fontSize: 10,
      fontWeight: Typography.FONT_WEIGHT_BOLD,
      color: "#615B73",
      flexWrap: "wrap",
      ...theme.eventTimes
    },
    line: {
      height: 1,
      position: "absolute",
      left: leftMargin,
      backgroundColor: "rgb(216,216,216)",
      ...theme.line
    },
    lineNow: {
      height: 2,
      position: "absolute",
      left: leftMargin,
      backgroundColor: Colors.themeColor().colors.secondary,
      ...theme.line
    },
    timeLabel: {
      position: "absolute",
      left: 15,
      color: Colors.themeColor().colors.empty,
      fontSize: Typography.FONT_SIZE_SMALL,
      fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "Roboto",
      fontWeight: Typography.FONT_WEIGHT_NORMAL,
      ...theme.timeLabel
    }
  };
  return StyleSheet.create(style);
};

export default styleConstructor;
