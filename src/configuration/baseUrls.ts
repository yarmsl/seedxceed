export const LANG = (process.env.REACT_APP_LANG || "ru") as "ru" | "pt";
export const IS_DEV = process.env.REACT_APP_PRODUCTION === "true" ? false : true;
export const DATA_API_URL = process.env.REACT_APP_DATA_URL;
export const PASSPORT_URL = process.env.REACT_APP_PASSPORT_URL;
