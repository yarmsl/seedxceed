import { LANG } from "configuration/baseUrls";

export const flagUrl = (country: string) =>
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`;

export const pathParse = (url: string, pos: "start" | "end" = "end") => {
  return url
    .split("/")
    .reduce((pv, curr, i, arr) =>
      i === (pos === "end" ? arr.length - 1 : 1) ? curr : pv
    );
};

export const currency = (sum: number) => {
  let locale = "ru-RU";
  let curr = "RUB";
  if (LANG === "pt") {
    locale = "pt-BR";
    curr = "BRL";
  }
  return sum.toLocaleString(locale, {
    style: "currency",
    currency: curr,
    maximumFractionDigits: 0,
  });
};

export const date = (str: string) => {
  let locale = "ru-RU";
  if (LANG === "pt") {
    locale = "pt-BR";
  }
  const date = new Date(str);
  if (date.toString() !== "Invalid Date") {
    return date.toLocaleDateString(locale);
  } else {
    return str;
  }
};

export const dateWithTime = (str: string) => {
  let locale = "ru-RU";
  if (LANG === "pt") {
    locale = "pt-BR";
  }
  const date = new Date(str);
  if (date.toString() !== "Invalid Date") {
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return str;
  }
};

export const round10 = (n: number, hundred?: boolean) => {
  let abs = 1;
  if (n < 0) abs = -1;
  const l = `${Math.abs(n)}`.length;
  const fixL = hundred ? l - 1 : l < 5 ? 4 : l - 1;
  const arg = +"1".padEnd(fixL, "0");
  return Math.ceil(Math.abs(n) / arg) * arg * abs;
};

export const ddCrutch = (d: timeStampTypes) => {
  switch (d) {
    case 1:
      return 1;
    case 7:
      return 7;
    case 30:
      return 30;
    case 90:
      return 90;
    default:
      return 0;
  }
};
