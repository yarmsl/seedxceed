import { TPath } from "./path.conf";

export const uiSelectorsConf: {
  path: TPath;
  tsType: "period" | "calendar" | "both" | "week" | null;
  mpsType: "multiple" | "mono" | null;
  ssType: "multiple" | "mono" | null;
  liveType?: "multiple";
}[] = [
  {
    path: "/dashboard",
    tsType: "both",
    mpsType: "multiple",
    ssType: "multiple",
  },
  {
    path: "/mysales/sales",
    tsType: "both",
    mpsType: "mono",
    ssType: "multiple",
  },
  {
    path: "/mysales/brands",
    tsType: "both",
    mpsType: "mono",
    ssType: "multiple",
  },
  {
    path: "/mysales/goods",
    tsType: "both",
    mpsType: "mono",
    ssType: "multiple",
  },
  {
    path: "/mysales/sales_dynamics",
    tsType: "week",
    mpsType: "mono",
    ssType: "multiple",
  },
  {
    path: "/mysales/sales_geography",
    tsType: "both",
    mpsType: "mono",
    ssType: "multiple",
  },
  {
    path: "/mygoods/goods",
    tsType: "both",
    mpsType: "mono",
    ssType: "multiple",
  },
  {
    path: "/mygoods/new_card",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/mygoods/templates",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/product/:id",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/scanner",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/autorestorer",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/telegram_bots",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/mp_connect",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/darkside/complaints",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/profile/user",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/profile/payments",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/profile/security",
    tsType: null,
    mpsType: null,
    ssType: null,
  },
  {
    path: "/live",
    tsType: "both",
    mpsType: "multiple",
    ssType: null,
    liveType: "multiple",
  },
];
