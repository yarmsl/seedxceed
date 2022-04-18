import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { authAPI, AuthReducer } from "./Auth";
import { dashboardAPI } from "./Dashboard/Dashboard.service";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ModalStackReducer } from "./ModalStack";
import { notificationsReducer } from "./Notifications";
import { UIReducer } from "./UI";
import { UserReducer } from "./User";
import { sendMailReducer } from "./Scanner/Scanner.reducer";
import { DashboardReducer } from "./Dashboard";
import { PaymentScannerReducer } from "./Scanner/Payment.reducer";
import { productAPI, ProductsReducer } from "./Products";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  complaintsAPI,
  FavoriteAPI,
  BasketAPI,
} from "./DarkSide/DarkSide.service";
import { salesAPI } from "./Sales";
import { liveAPI, LiveReducer } from "./Live";

// import { TokenMiddleware } from "./Auth/Auth.middleware";

const UIPersistConfig = {
  key: "ui",
  storage: storage,
  whitelist: [
    "locale",
    "darkMode",
    "langType",
    "jhonWeekSelector",
    "calendarSelector",
    "mpSelector",
    "shopSelector",
    "liveTypesSelector",
    "smsTimer",
    "warningWindow",
  ],
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  PaymentScanner: PaymentScannerReducer,
  sendMail: sendMailReducer,
  dashboard: DashboardReducer,
  notifications: notificationsReducer,
  modalStack: ModalStackReducer,
  ui: persistReducer(UIPersistConfig, UIReducer),
  products: ProductsReducer,
  live: LiveReducer,
  [dashboardAPI.reducerPath]: dashboardAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
  [complaintsAPI.reducerPath]: complaintsAPI.reducer,
  [FavoriteAPI.reducerPath]: FavoriteAPI.reducer,
  [BasketAPI.reducerPath]: BasketAPI.reducer,
  [salesAPI.reducerPath]: salesAPI.reducer,
  [liveAPI.reducerPath]: liveAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      // TokenMiddleware,
      dashboardAPI.middleware,
      authAPI.middleware,
      productAPI.middleware,
      complaintsAPI.middleware,
      FavoriteAPI.middleware,
      BasketAPI.middleware,
      salesAPI.middleware,
      liveAPI.middleware
    ),
});

export const persistor = persistStore(appStore);
export type TRootState = ReturnType<typeof appStore.getState>;
export type AppStore = typeof appStore;
export type TAppDispatch = ThunkDispatch<TRootState, null, AnyAction>;
export const useAppDispatch = (): TAppDispatch => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export default appStore;
