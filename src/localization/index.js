import * as Localization from "expo-localization";
import i18n from "i18n-js";

import en from "./languages/en";
import hr from "./languages/hr";

i18n.translations = {
  en: en,
  hr: hr
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it"ll fallback to another language with the key present.
i18n.fallbacks = true;

export const localization = (translationItem) => {
  return i18n.t(translationItem);
};

export const language = () => {
  const languageCode = i18n.locale;
  if (languageCode === "hr-HR") { return localization("croatian"); } else { return localization("english"); }
};
