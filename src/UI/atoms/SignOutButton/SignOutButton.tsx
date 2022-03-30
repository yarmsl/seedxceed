import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store";
import { signOutThunkAction } from "store/Auth";
import { ReactComponent as LogoutSvg } from "../../../assets/icons/logout.svg";

const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((st) => st.ui);
  const { t } = useTranslation("profile");

  return (
    <ListItemButton
      onClick={() => dispatch(signOutThunkAction())}
      sx={darkMode ? dark : light}
      disableGutters
    >
      <ListItemIcon sx={styles.icon}>
        <LogoutSvg />
      </ListItemIcon>
      <ListItemText>{t`signOut`}</ListItemText>
    </ListItemButton>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    m: "6px 0",
    p: "6px 10px",
    borderRadius: 1,
    whiteSpace: "nowrap",
    color: "#fff",
  },
  light: {
    bgcolor: "#90CAF9",
    "&:hover": {
      bgcolor: "#2f9cf5",
    },
  },
  dark: {
    bgcolor: "#074c85",
    "&:hover": {
      bgcolor: "#0966b3",
    },
  },
  icon: {
    color: "inherit",
  },
};

const light = { ...styles.root, ...styles.light };
const dark = { ...styles.root, ...styles.dark };

export default memo(SignOutButton);
