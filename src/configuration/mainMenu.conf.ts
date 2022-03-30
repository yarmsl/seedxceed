import { ReactComponent as homeIcon } from "../assets/mainmenu/home.svg";
import { ReactComponent as salesIcon } from "../assets/mainmenu/sales.svg";
import { ReactComponent as productIcon } from "../assets/mainmenu/product.svg";
// import { ReactComponent as autopilotIcon } from "../assets/mainmenu/autopilot.svg";
import { ReactComponent as scannerIcon } from "../assets/mainmenu/scanner.svg";
import { ReactComponent as telegramIcon } from "../assets/mainmenu/telegram.svg";
import { ReactComponent as marketIcon } from "../assets/mainmenu/market.svg";
import { ReactComponent as darksideIcon } from "../assets/mainmenu/deathstar.svg";

export const mainMenuConf: IMainMenuItemConf[] = [
  { title: "desktop", path: "dashboard", Icon: homeIcon, access: "customer" },
  { title: "mySales", path: "mysales", Icon: salesIcon, access: "customer" },
  {
    title: "myGoods",
    path: "mygoods",
    Icon: productIcon,
    access: "customer",
  },
  // {
  //   title: "autopilot",
  //   path: "autorestorer",
  //   Icon: autopilotIcon,
  //   access: "customer",
  // },
  {
    title: "roboScanner",
    path: "scanner",
    Icon: scannerIcon,
    access: "customer",
  },
  {
    title: "telegramBots",
    path: "telegram_bots",
    Icon: telegramIcon,
    access: "customer",
  },
  {
    title: "SXC Маркет",
    path: "https://market.seed-x-ceed.com",
    externalPath: true,
    Icon: marketIcon,
    access: "customer",
  },
  { title: "darkside", path: "darkside", Icon: darksideIcon, access: "admin" },
];
