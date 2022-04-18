import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toggleDarkMode } from "../../../store/UI";

import { ReactComponent as EyeIcon } from "../../../assets/icons/Eye.svg";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const NightModeToggler = () => {
  const { t } = useTranslation("menu");
  const { darkMode } = useAppSelector((st) => st.ui);
  const dispatch = useAppDispatch();
  return (
    <ListItemButton
      onClick={() => dispatch(toggleDarkMode())}
      sx={darkMode ? dark : light}
      disableGutters
    >
      <ListItemIcon sx={styles.icon}>
        <EyeIcon />
      </ListItemIcon>
      <ListItemText>{darkMode ? t`lightMode` : t`darkMode`}</ListItemText>
    </ListItemButton>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    m: "6px 0",
    p: "6px 10px",
    borderRadius: 1,
    whiteSpace: "nowrap",
  },
  light: {
    bgcolor: "#212946",
    color: "#8492C4",
    "&:hover": {
      bgcolor: "#161a1e",
    },
  },
  dark: {
    bgcolor: "primary.main",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
  icon: {
    color: "inherit",
  },
};

const light = { ...styles.root, ...styles.light };
const dark = { ...styles.root, ...styles.dark };

export default memo(NightModeToggler);
