import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILiveState = {
  livesCount: 30,
  ordersPage: 0,
  ordersRows: 10,
};

const LiveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    setLivesCount: (state, action: PayloadAction<number>) => {
      state.livesCount = action.payload;
    },
    setOrdersPage: (state, action: PayloadAction<number>) => {
      state.ordersPage = action.payload;
    },
    setOrdersRows: (state, action: PayloadAction<number>) => {
      state.ordersRows = action.payload;
    },
    resetLives: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setLivesCount, setOrdersPage, setOrdersRows, resetLives } =
  LiveSlice.actions;
export const { reducer: LiveReducer } = LiveSlice;
