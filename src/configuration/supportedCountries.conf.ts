import { Country } from "react-phone-number-input";
import { LANG } from "./baseUrls";

export const supportedCountriesConf: Partial<Country>[] =
  LANG === "ru"
    ? [
        "AM",
        "AZ",
        "BY",
        "UA",
        "RU",
        "KZ",
        "TJ",
        "GE",
        "LT",
        "LV",
        "UZ",
        "KG",
        "MD",
        "TM",
        "EE",
      ]
    : ["BR", "US"];
