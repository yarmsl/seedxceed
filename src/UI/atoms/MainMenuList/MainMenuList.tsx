import { memo } from "react";
import { List } from "@mui/material";
import MainMenuListLink from "./MainMenuListLink";
import WhackMenuItem from "./WhackMenuItem";
import { LANG } from "configuration/baseUrls";

const MainMenuList = ({ items }: IMainMenuListProps): JSX.Element => {
  return (
    <List>
      {items.map((item) => (
        <MainMenuListLink key={item.title} {...item} />
      ))}
      {LANG === "ru" && <WhackMenuItem />}
    </List>
  );
};

export default memo(MainMenuList);
