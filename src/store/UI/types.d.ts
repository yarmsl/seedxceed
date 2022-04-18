interface UIState {
  burgerMenu: boolean;
  darkMode: boolean;
  locale: string;
  langType: "ru" | "pt";
  jhonWeekSelector: ICalendarSelectorNew;
  calendarSelector: ICalendarSelector;
  timeStampSelector: timeStampTypes;
  shopSelector: string[];
  mpSelector: supportedMarketTypes[];
  exchangeRate: number;
  warningWindow: { count: number; timestamp: Date };
}

interface ICalendarSelector {
  d: timeStampTypes;
  dd: number;
}

interface ICalendarSelectorNew {
  d: Date;
  dd: Date;
}
interface IExchangeRateReq {
  lang: string;
}

interface IExchangeRateRes {
  course: number;
}
