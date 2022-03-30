import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dashboardAPI } from "./Dashboard.service";

const initialState: IDashboardState = {
  linkedShops: [],
  dashboard: { wb: null, oz: null, ym: null, ml: null },
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboardMp: (state, action: PayloadAction<supportedMarketTypes>) => {
      state.dashboard[action.payload] = null;
    },
    resetDashboard: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dashboardAPI.endpoints.getLinkedShops.matchFulfilled,
      (state, action) => {
        state.linkedShops = action.payload;
      }
    );
    builder.addMatcher(
      dashboardAPI.endpoints.getDashboard.matchPending,
      (state, action) => {
        state.dashboard[action.meta.arg.originalArgs.m] = null;
      }
    );
    builder.addMatcher(
      dashboardAPI.endpoints.getDashboard.matchFulfilled,
      (state, action) => {
        state.dashboard[action.meta.arg.originalArgs.m] = action.payload;
      }
    );
    builder.addMatcher(
      dashboardAPI.endpoints.getDashboard.matchRejected,
      (state, action) => {
        state.dashboard[action.meta.arg.originalArgs.m] = null;
      }
    );
  },
});

export const { resetDashboard, resetDashboardMp } = DashboardSlice.actions;
export const { reducer: DashboardReducer } = DashboardSlice;
