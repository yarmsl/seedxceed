interface IMainMenuItemConf {
  title: string;
  externalPath?: boolean;
  path: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  access: userRoles;
}

interface ITimeStamps {
  title: string;
  ts: timeStampTypes;
}

interface IMPConf {
  title: string;
  mp: supportedMarketTypes;
  color: string;
  color2: string;
  logo: string;
  icon: string;
  SvgLogo: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  SvgIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

interface IUiSelectorsConf {
  path: TPath;
  tsType: "period" | "week" | null;
  mpsType: "multiple" | "mono" | null;
  ssType: "multiple" | "mono" | null;
}

type TPath =
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
  | "/live/timeline"
  | "/live/orders";
