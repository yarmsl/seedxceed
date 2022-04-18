import { Box, SxProps } from "@mui/material";
import { mainMenuConf } from "configuration/mainMenu.conf";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store";
import SeedXceedLogo from "UI/atoms/Logo/SeedXceedLogo";
import MainMenuList from "UI/atoms/MainMenuList/MainMenuList";
import NightModeToggler from "UI/atoms/NightModeToggler/NightModeToggler";
import NotifButton from "UI/atoms/NotifButton/NotifButton";
import ProfileButton from "UI/atoms/ProfileButton/ProfileButton";
import SignOutButton from "UI/atoms/SignOutButton/SignOutButton";
import LangSwitcher from "UI/molecules/LangSwitcher/LangSwitcher";
import { LANG } from "../../../configuration/baseUrls";

const MainMenuConnected = () => {
  const { t } = useTranslation("menu");
  const { role } = useAppSelector((st) => st.user.data);
  const { darkMode } = useAppSelector((st) => st.ui);
  const menuItems = useMemo(
    () =>
      mainMenuConf
        .filter((item) =>
          LANG === "ru"
            ? item
            : !(item.title === "roboScanner" || item.title === "SXC Маркет")
        )
        .map((item) => ({ ...item, title: t(item.title) }))
        .filter((item) =>
          role !== "admin" ? item.access === "customer" : "false"
        ),
    [t, role]
  );

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={darkMode ? dark : light}>
          <SeedXceedLogo />
        </Box>
        <MainMenuList items={menuItems} />
      </Box>
      <Box sx={styles.bottomControls}>
        <Box sx={styles.bottomControls}>
          <NotifButton />
          <ProfileButton />
        </Box>
        {LANG === "pt" && <LangSwitcher />}
        <NightModeToggler />
        <SignOutButton />
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    color: "text.secondary",
  },
  logo: {
    p: "0 7px",
    mb: "24px",
  },
  bottomControls: {
    mb: "48px",
  },
  light: {
    color: "#111827",
  },
  dark: {
    color: "#fff",
  },
};

const light = { ...styles.logo, ...styles.light };
const dark = { ...styles.logo, ...styles.dark };

export default memo(MainMenuConnected);
