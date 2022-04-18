import { memo, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CheckAuthPage from "connectedPages/Auth/CheckAuthPage";
import AuthLayout from "UI/molecules/AuthLayout";
import MainLayout from "./UI/molecules/MainLayout";
import TabsLayout from "UI/molecules/TabsLayout";
import NotFound from "./connectedPages/NotFound";
import { salesPageConf } from "configuration/salesPage.conf";
import { darkSidePageConf } from "configuration/darkSidePage.conf";
import { profilePageConf } from "configuration/profilePage.conf";
import { goodsPageConf } from "configuration/goodsPage.conf";
import { livePageConf } from "configuration/livePage.conf";

const AuthPage = lazy(() => import("connectedPages/Auth/AuthPage"));
const RegPage = lazy(() => import("connectedPages/Auth/RegPage"));
const RecoveryPage = lazy(() => import("connectedPages/Auth/RecoveryPage"));
const NewPassPage = lazy(() => import("connectedPages/Auth/NewPassPage"));
const DashboardPage = lazy(() => import("connectedPages/Dashboard/Dashboard"));
const TelegramBotsPage = lazy(
  () => import("./connectedPages/TelegramBots/TelegramBots")
);
const BrandsPage = lazy(() => import("connectedPages/Sales/Brands"));
const SalesPage = lazy(() => import("connectedPages/Sales/Sales"));
const SalesDynamicsPage = lazy(
  () => import("connectedPages/Sales/SalesDinamics")
);
const SalesGeographyPage = lazy(
  () => import("connectedPages/Sales/SalesGeography")
);
const GoodsPage = lazy(() => import("connectedPages/Goods/Goods"));
const NewCardPage = lazy(() => import("connectedPages/Goods/NewCard"));
const TemplatesPage = lazy(() => import("connectedPages/Goods/Templates"));
const ProductPage = lazy(() => import("connectedPages/Goods/Product"));
const AutorestorerPage = lazy(
  () => import("connectedPages/Autopilot/Autorestorer")
);
const Scanner = lazy(() => import("connectedPages/Scanner/Scanner"));
const ComplaintsPage = lazy(() => import("connectedPages/DarkSide/Complaints"));
const FavoritePage = lazy(() => import("connectedPages/DarkSide/Favorite"));
const BasketPage = lazy(() => import("connectedPages/DarkSide/Basket"));
const ConnectMarketPage = lazy(
  () => import("connectedPages/ConnectMarket/ConnectMarketPage")
);
const ProfilePage = lazy(() => import("connectedPages/Profile/Profile"));
const PaymentsPage = lazy(() => import("connectedPages/Profile/Payments"));
const SecurityPage = lazy(() => import("connectedPages/Profile/Security"));
const TimelinePage = lazy(() => import("connectedPages/Live/TimelinePage"));
const OrdersPage = lazy(() => import("connectedPages/Live/OrdersPage"));

interface IRouterProps {
  isAuth: boolean;
  isCheckedAuth: boolean;
  role: userRoles;
}

const Router = ({ isAuth, isCheckedAuth, role }: IRouterProps): JSX.Element => {
  return (
    <Routes>
      {!isCheckedAuth ? (
        <Route path="*" element={<CheckAuthPage />} />
      ) : !isAuth ? (
        <Route path="*" element={<AuthLayout />}>
          <Route path="signin" element={<AuthPage />} />
          <Route path="signup" element={<RegPage />} />
          <Route path="recovery" element={<RecoveryPage />} />
          <Route path="new_password" element={<NewPassPage />} />
          <Route path="" element={<Navigate to="signin" />} />
          <Route path="*" element={<Navigate to="signin" />} />
        </Route>
      ) : (
        <Route path="*" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="mysales/"
            element={<TabsLayout pageConf={salesPageConf} />}
          >
            <Route path="sales" element={<SalesPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="sales_dynamics" element={<SalesDynamicsPage />} />
            <Route path="sales_geography" element={<SalesGeographyPage />} />
            <Route path="" element={<Navigate to="sales" />} />
            <Route path="*" element={<Navigate to="sales" />} />
          </Route>
          <Route
            path="profile"
            element={<TabsLayout pageConf={profilePageConf} />}
          >
            <Route path="user" element={<ProfilePage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="" element={<Navigate to="user" />} />
            <Route path="*" element={<Navigate to="user" />} />
          </Route>

          <Route
            path="mygoods"
            element={<TabsLayout pageConf={goodsPageConf} />}
          >
            <Route path="goods" element={<GoodsPage />} />
            <Route path="new_card" element={<NewCardPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="" element={<Navigate to="goods" />} />
            <Route path="*" element={<Navigate to="goods" />} />
          </Route>
          <Route path="product/:id/:shop/:mp" element={<ProductPage />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="autorestorer" element={<AutorestorerPage />} />
          <Route path="telegram_bots" element={<TelegramBotsPage />} />
          <Route path="mp_connect" element={<ConnectMarketPage />} />
          <Route path="live" element={<TabsLayout pageConf={livePageConf} />}>
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="" element={<Navigate to="timeline" />} />
            <Route path="*" element={<Navigate to="timeline" />} />
          </Route>
          {role === "admin" && (
            <Route
              path="darkside"
              element={<TabsLayout pageConf={darkSidePageConf} />}
            >
              <Route path="complaints" element={<ComplaintsPage />} />
              <Route path="favorite" element={<FavoritePage />} />
              <Route path="basket" element={<BasketPage />} />
              <Route path="" element={<Navigate to="complaints" />} />
              <Route path="*" element={<Navigate to="complaints" />} />
            </Route>
          )}
          <Route path="signin" element={<Navigate to="/dashboard" />} />
          <Route path="signup" element={<Navigate to="/dashboard" />} />
          <Route path="" element={<Navigate to="dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}
    </Routes>
  );
};

export default memo(Router);
