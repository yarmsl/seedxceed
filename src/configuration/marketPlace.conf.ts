import { ReactComponent as WbLogo } from "../assets/markets/wbLogo.svg";
import { ReactComponent as OzLogo } from "../assets/markets/ozLogo.svg";
import { ReactComponent as YmLogo } from "../assets/markets/ymLogo.svg";
import { ReactComponent as MlLogo } from "../assets/markets/mlLogo.svg";
import { ReactComponent as WbIcon } from "../assets/markets/wbIcon.svg";
import { ReactComponent as OzIcon } from "../assets/markets/ozIcon.svg";
import { ReactComponent as YmIcon } from "../assets/markets/ymIcon.svg";

export const marketPlaceConf: IMPConf[] = [
  {
    title: "Wildberries",
    mp: "wb",
    color: "#7209b7",
    color2: "#B5179E",
    logo: "/img/mp/wbLogo.png",
    icon: "/img/mp/wbIcon.png",
    SvgLogo: WbLogo,
    SvgIcon: WbIcon,
  },
  {
    title: "Ozon",
    mp: "oz",
    color: "#1565C0",
    color2: "#2196F3",
    logo: "/img/mp/ozonLogo.png",
    icon: "/img/mp/ozIcon.png",
    SvgLogo: OzLogo,
    SvgIcon: OzIcon,
  },
  {
    title: "Yandex",
    mp: "ym",
    color: "#ffc107",
    color2: "#FFE57F",
    logo: "/img/mp/ymLogo.png",
    icon: "/img/mp/ymIcon.png",
    SvgLogo: YmLogo,
    SvgIcon: YmIcon,
  },
  {
    title: "Mercado Libre",
    mp: "ml",
    color2: "#ffe57f",
    color: "#ffcc2b",
    logo: "/img/mp/mlLogo.png",
    icon: "/img/mp/mlIcon.png",
    SvgLogo: MlLogo,
    SvgIcon: MlLogo,
  },
];
