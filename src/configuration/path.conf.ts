export const pathConf: TPath[] = [
  //указывать динамическим параметром для роутов всегда один - id
  "/dashboard",
  "/mysales/sales",
  "/mysales/brands",
  "/mysales/goods",
  "/mysales/sales_dynamics",
  "/mysales/sales_geography",
  "/mygoods/goods",
  "/mygoods/new_card",
  "/mygoods/templates",
  "/product/:id",
  "/scanner",
  "/autorestorer",
  "/telegram_bots",
  "/mp_connect",
  "/darkside/complaints",
  "/profile/user",
  "/profile/payments",
  "/profile/security",
  "/live",
];

export type TPath =
  | "/dashboard"
  | "/mysales/sales"
  | "/mysales/brands"
  | "/mysales/goods"
  | "/mysales/sales_dynamics"
  | "/mysales/sales_geography"
  | "/mygoods/goods"
  | "/mygoods/new_card"
  | "/mygoods/templates"
  | "/product/:id"
  | "/scanner"
  | "/autorestorer"
  | "/telegram_bots"
  | "/mp_connect"
  | "/darkside/complaints"
  | "/profile/user"
  | "/profile/payments"
  | "/profile/security"
  | "/live";
