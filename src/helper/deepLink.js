import AppLink from "react-native-app-link";

export const openLink = ({ cashlessLink, appName, appStoreId, appStoreLocale, playStoreId }) => {
  AppLink.maybeOpenURL(cashlessLink, { appName: appName, appStoreId: appStoreId, appStoreLocale: appStoreLocale, playStoreId: playStoreId })
    .catch((err) => {
      alert("Ups! Deep link error.");
      console.log(err);
    });
};
