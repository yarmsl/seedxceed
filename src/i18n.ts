import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import HttpApi from "i18next-http-backend";
import { LANG } from "configuration/baseUrls";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [LocalStorageBackend, HttpApi],
      backendOptions: [
        {
          expirationTime: 3 * 24 * 60 * 60 * 1000,
          defaultVersion: "v3.83",
          versions: { en: "v3.83", ru: "v3.83", pt: "v3.83" },
        },
        {},
      ],
    },
    lng: LANG,
    fallbackLng: LANG || "en",
    react: {
      useSuspense: false,
    },
  });

export default i18n;
