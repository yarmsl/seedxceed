interface UIState {
  burgerMenu: boolean;
  darkMode: boolean;
  locale: string;
  langType: "ru" | "pt";
  calendarSelector: ICalendarSelector;
  timeStampSelector: timeStampTypes;
  shopSelector: string[];
  mpSelector: supportedMarketTypes[];
  liveTypesSelector: LiveNotifTypes[];
  exchangeRate: number;
  warningWindow: { count: number; timestamp: Date };
}

interface ICalendarSelector {
  d: timeStampTypes;
  dd: number;
}
interface IExchangeRateReq {
  lang: string;
}

interface IExchangeRateRes {
  course: number;
}
