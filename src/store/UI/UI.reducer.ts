import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LANG } from "configuration/baseUrls";
import { endOfWeek, startOfWeek } from "date-fns";
import { ptBR, ru } from "date-fns/locale";
import { getExchangeRateThunkAction } from "./UI.actions";

const weekStartDay = startOfWeek(new Date(), {
  locale: LANG === "ru" ? ru : ptBR,
});

const weekEndDay = endOfWeek(new Date(), {
  locale: LANG === "ru" ? ru : ptBR,
});

const initialState: UIState = {
  locale: LANG,
  burgerMenu: false,
  darkMode: false,
  langType: LANG,
  jhonWeekSelector: { d: weekStartDay, dd: weekEndDay },
  calendarSelector: { d: 30, dd: 30 },
  timeStampSelector: 30,
  shopSelector: [],
  mpSelector: [],
  exchangeRate: 1,
  warningWindow: { count: 0, timestamp: new Date() },
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    toggleBurgerMenu: (state) => {
      state.burgerMenu = state.burgerMenu ? false : true;
    },
    closeBurgerMenu: (state) => {
      state.burgerMenu = false;
    },
    toggleDarkMode: (state) => {
      state.darkMode = state.darkMode ? false : true;
    },
    setWeek: (state, action: PayloadAction<ICalendarSelectorNew>) => {
      state.jhonWeekSelector = action.payload;
    },
    setCalendar: (state, action: PayloadAction<ICalendarSelector>) => {
      state.calendarSelector = action.payload;
    },
    setTimeStamp: (state, action: PayloadAction<timeStampTypes>) => {
      state.timeStampSelector = action.payload;
    },
    setShops: (state, action: PayloadAction<string[]>) => {
      state.shopSelector = action.payload;
    },
    setMPs: (state, action: PayloadAction<supportedMarketTypes[]>) => {
      state.mpSelector = action.payload;
    },
    setWarningWindowProps: (state) => {
      state.warningWindow = {
        count: state.warningWindow.count + 1,
        timestamp: new Date(),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getExchangeRateThunkAction.fulfilled,
      (state, action: PayloadAction<IExchangeRateRes>) => {
        state.exchangeRate = action.payload.course;
      }
    );
  },
});

export const {
  setLocale,
  toggleBurgerMenu,
  closeBurgerMenu,
  toggleDarkMode,
  setWeek,
  setCalendar,
  setTimeStamp,
  setMPs,
  setShops,
  setWarningWindowProps,
} = UISlice.actions;
export const { reducer: UIReducer } = UISlice;
