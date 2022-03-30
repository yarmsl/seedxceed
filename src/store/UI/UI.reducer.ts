import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LANG } from "configuration/baseUrls";
import { getExchangeRateThunkAction } from "./UI.actions";

const initialState: UIState = {
  locale: LANG,
  burgerMenu: false,
  darkMode: false,
  langType: LANG,
  calendarSelector: { d: 30, dd: 30 },
  timeStampSelector: 30,
  shopSelector: [],
  mpSelector: [],
  liveTypesSelector: ["orders", "sales", "returns", "cancellation"],
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
    setLiveTypes: (state, action: PayloadAction<LiveNotifTypes[]>) => {
      state.liveTypesSelector = action.payload;
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
  setCalendar,
  setTimeStamp,
  setMPs,
  setShops,
  setLiveTypes,
  setWarningWindowProps,
} = UISlice.actions;
export const { reducer: UIReducer } = UISlice;
