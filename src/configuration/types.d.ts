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
