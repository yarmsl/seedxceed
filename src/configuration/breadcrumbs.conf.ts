export const breadcrumbsConf: {
  path: TPath;
  breadcrumb: string;
  backwards?: boolean;
}[] = [
  { path: "/dashboard", breadcrumb: "desktop" },
  { path: "/mysales/sales", breadcrumb: "mySales" },
  { path: "/mysales/brands", breadcrumb: "mySales" },
  { path: "/mysales/goods", breadcrumb: "mySales" },
  { path: "/mysales/sales_dynamics", breadcrumb: "mySales" },
  { path: "/mysales/sales_geography", breadcrumb: "mySales" },
  { path: "/mygoods/goods", breadcrumb: "myGoods" },
  { path: "/mygoods/new_card", breadcrumb: "myGoods" },
  { path: "/mygoods/templates", breadcrumb: "myGoods" },
  { path: "/scanner", breadcrumb: "roboScanner" },
  { path: "/autorestorer", breadcrumb: "autoRepair" },
  { path: "/telegram_bots", breadcrumb: "telegramBots" },
  { path: "/mp_connect", breadcrumb: "apiConnect" },
  { path: "/darkside/complaints", breadcrumb: "darkside" },
  { path: "/profile/user", breadcrumb: "profile" },
  { path: "/profile/payments", breadcrumb: "profile" },
  { path: "/profile/security", breadcrumb: "profile" },
  { path: "/product/:id", breadcrumb: "myGoods", backwards: true },
  { path: "/live/timeline", breadcrumb: "Live" },
  { path: "/live/orders", breadcrumb: "myGoods" },
];
