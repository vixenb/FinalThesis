export const darkTheme = {
  colors: {
    primary: "",
    secondary: "",
    empty: "",
    primaryTextColor: "",
    secondaryTextColor: "",
    primaryBackgroundColor: "#000000",
    secondaryBackgroundColor: "",
    gold: "d4af37",
    thernaryText: "#EDEDED",
    shadowColor: "#ffffff",
    primaryTouchable: "#a380c2",
    facebookBlue: "#4267B2",
    youtubeRed: "#FF0000",
    disabledDarkGray: "#767577",
    disabledDarkGrayLightTint: "#adacad",
    disabledLightGray: "#f4f3f4",
    disabledGray: "#bebebe",
    eventBackground: "#a6d4de",
    favoriteEventBackground: "#cdbda2",
    primaryInput: "#cab7cd",
    mainStagePin: "#ebb315",
    mainStagePinLightTint: "#f3d173",
    restaurantPin: "#70560c",
    restaurantPinLightTint: "#a9996d",
    campPin: "#0b6b1e",
    campPinLightTint: "#6da678",
    shopPin: "#6f048c",
    shopPinLightTint: "#a868ba",
    drinksPin: "#a87b32",
    drinksPinLightTint: "#cbb084",
    topupsPin: "#bb99ff",
    topupsPinLightTint: "#d6c2ff",
    enterancePin: "#57995a",
    enterancePinLightTint: "#9ac29c",
    exitPin: "#4c69a6",
    exitPinLightTint: "#91b5ff",
    parkingPin: "#4783ff",
    parkingPinLightTint: "#94a5ca",
    firstaidPin: "#db1a1a",
    firstaidPinLightTint: "#e97676",
    mapPolygonColor: "#e47979",
    campPolygon: "#7ed991",
    campPolygonStroke: "#36a84e",
    walkingAreaPolygon: "rgba(127,127,127,0.17)",
    transparentPolygonFill: "rgba(0,0,0,0)"
  }
};

export const lightTheme = {
  colors: {
    primary: "#8c59ba",
    secondary: "#ffd117",
    empty: "#a9a9a9",
    primaryTextColor: "#ffffff",
    secondaryTextColor: "#000000",
    primaryBackgroundColor: "#ffffff",
    secondaryBackgroundColor: "#000000",
    gold: "#d4af37",
    shadowColor: "#000000",
    primaryTouchable: "#a380c2",
    facebookBlue: "#4267B2",
    youtubeRed: "#FF0000",
    disabledDarkGray: "#767577",
    disabledDarkGrayLightTint: "#adacad",
    disabledLightGray: "#f4f3f4",
    disabledGray: "#bebebe",
    eventBackground: "#a6d4de",
    favoriteEventBackground: "#cdbda2",
    primaryInput: "#cab7cd",
    mainStagePin: "#ebb315",
    mainStagePinLightTint: "#f3d173",
    restaurantPin: "#70560c",
    thernaryText: "#EDEDED",
    restaurantPinLightTint: "#a9996d",
    campPin: "#0b6b1e",
    campPinLightTint: "#6da678",
    shopPin: "#6f048c",
    shopPinLightTint: "#a868ba",
    drinksPin: "#a87b32",
    drinksPinLightTint: "#cbb084",
    topupsPin: "#bb99ff",
    topupsPinLightTint: "#d6c2ff",
    enterancePin: "#57995a",
    enterancePinLightTint: "#9ac29c",
    exitPin: "#4c69a6",
    exitPinLightTint: "#91b5ff",
    parkingPin: "#4783ff",
    parkingPinLightTint: "#94a5ca",
    firstaidPin: "#db1a1a",
    firstaidPinLightTint: "#e97676",
    mapPolygonColor: "#e47979",
    campPolygon: "#7ed991",
    campPolygonStroke: "#36a84e",
    walkingAreaPolygon: "rgba(127,127,127,0.17)",
    transparentPolygonFill: "rgba(0,0,0,0)"
  }
};

// Color theme selector

export const themeColor = () => {
  const currentThemeType = "light";

  if (currentThemeType === "light") {
    return lightTheme;
  } else {
    return darkTheme;
  }
};

// Opacity setup
export const EMPTY_OPACITY = 0.4;
export const TOUCHABLE_OPACITY = 0.7;
export const MODAL_OPACITY = 0.9;
