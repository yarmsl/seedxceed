import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const ns = [
  "apiConnection",
  "auth",
  "autoRecoverer",
  "cash",
  "common",
  "date",
  "errors",
  "live",
  "menu",
  "newCard",
  "policy",
  "products",
  "profile",
  "publicOffer",
  "questions",
  "reviews",
  "scanner",
  "tgbots",
];
const supportedLngs = ["en", "ru", "pt"];

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "common",
  ns,
  supportedLngs,
});

supportedLngs.forEach((lang) => {
  ns.forEach((n) => {
    i18n.addResourceBundle(
      lang,
      n,
      require(`../public/locales/${lang}/${n}.json`)
    );
  });
});

export { i18n };
