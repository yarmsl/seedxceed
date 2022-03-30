import { ReactComponent as SalesBotIcon } from "../assets/telegramBots/tg_bot_sales_icon.svg";
import { ReactComponent as GrabberBotIcon } from "../assets/telegramBots/tg_bot_grabber_icon.svg";
import { ReactComponent as RaidBotIcon } from "../assets/telegramBots/tg_bot_raidalert_icon.svg";

export const telegramBotsConf = [
  {
    Icon: SalesBotIcon,
    title: "mySalesBot",
    content: "mySalesBotAbout",
    sub: "mySalesBotAbout2",
    active: true,
    link: "https://t.me/robotorg_bot",
    labelActive: "launchBot",
    labelDisabled: "soon",
  },
  {
    Icon: GrabberBotIcon,
    title: "grabberWBBot",
    content: "grabberWBBotAbout",
    sub: "",
    active: true,
    link: "https://t.me/sxc_wb_bot",
    labelActive: "launchBot",
    labelDisabled: "soon",
  },
  {
    Icon: RaidBotIcon,
    title: "raidAlertBot",
    content: "raidAlertBotAbout",
    sub: "",
    active: false,
    link: "",
    labelActive: "launchBot",
    labelDisabled: "soon",
  },
];
