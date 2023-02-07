import { StyleSheet, Dimensions, Platform } from "react-native";

// Boje
import * as Colors from "./colors";

// Tipografija
import * as Typography from "./typography";

const windowWidth = Dimensions.get("window").width;

export const layout = StyleSheet.create({
  containerBlack: {
    flex: 1,
    backgroundColor: Colors.themeColor().colors.secondaryBackgroundColor
  },
  containerLight: {
    flex: 1,
    backgroundColor: Colors.themeColor().colors.primaryBackgroundColor
  },
  flex: {
    flex: 1
  },
  standardVerticalPadding: {
    paddingVertical: Typography.FONT_SIZE_NORMAL
  },
  standardHorizontalPadding: {
    paddingHorizontal: Typography.FONT_SIZE_NORMAL
  },
  standardPaddingTop: {
    paddingTop: Typography.FONT_SIZE_NORMAL
  },
  standardHeaderHeight: {
    height: 100
  }
});

export const typography = StyleSheet.create({
  headerTitile: {
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_TITLE_LG,
    letterSpacing: Typography.LETTER_SPACING,
    color: Colors.themeColor().colors.secondary,
    textTransform: "uppercase"
  },
  headerLogo: {
    width: 160,
    height: 30,
    alignSelf: "center",
    resizeMode: "stretch",
    tintColor: Colors.themeColor().colors.secondary
  },
  leftHeaderIcon: {
    position: "absolute",
    left: Platform.OS === "ios" ? 10 : 0,
    color: Colors.themeColor().colors.primaryTextColor
  },
  rightHeaderIcon: {
    position: "absolute",
    right: Platform.OS === "ios" ? 12 : 2,
    color: Colors.themeColor().colors.primaryTextColor
  },
  title: {
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    color: Colors.themeColor().colors.primary,
    textTransform: "uppercase"
  },
  textCenter: {
    textAlign: "center"
  },
  uppercase: {
    textTransform: "uppercase"
  },
  subtitile: {
    fontSize: Typography.FONT_SIZE_SMALL,
    color: Colors.themeColor().colors.secondaryTextColor
  },
  windowWidth: {
    width: windowWidth
  },
  centeredItem: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export const buttons = StyleSheet.create({
  cashlessButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center"
  }
});

export const horizontalLine = StyleSheet.create({
  horizontalLine: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: Colors.themeColor().colors.secondaryTextColor
  }
});

export const shadow = StyleSheet.create({
  // elevation0 za komponente s predefiniranim stilom
  elevation0: {
    elevation: 0,
    shadowColor: Colors.themeColor().colors.primaryTextColor,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0,
    shadowRadius: 0
  },
  elevation4: {
    elevation: 4,
    shadowColor: Colors.themeColor().colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  elevation5: {
    elevation: 5,
    shadowColor: Colors.themeColor().colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  elevation6: {
    elevation: 6,
    shadowColor: Colors.themeColor().colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65
  }
});
