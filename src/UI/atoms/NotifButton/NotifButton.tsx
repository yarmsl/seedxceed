import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { memo, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "store";
import { ReactComponent as NotifIcon } from "../../../assets/icons/notification.svg";

const NotifButton = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const isSelected = useMemo(() => loc.pathname === "/live", [loc]);
  const { darkMode } = useAppSelector((st) => st.ui);

  return (
    <ListItemButton
      selected={isSelected}
      onClick={() => nav("live")}
      sx={darkMode ? dark : light}
      disableGutters
    >
      <ListItemIcon sx={styles.icon}>
        <NotifIcon />
      </ListItemIcon>
      <ListItemText>Live</ListItemText>
    </ListItemButton>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    m: "6px 0",
    p: "6px 10px",
    borderRadius: 1,
    whiteSpace: "nowrap",
    color: "text.secondary",
  },
  light: {
    bgcolor: "#FFE57F",
    "&.Mui-selected": {
      bgcolor: "#FFE57F",
      outline: "2px solid #FFC107",
      "&:hover": {
        bgcolor: "#ffdb4d",
      },
    },
    "&:hover": {
      bgcolor: "#ffdb4d",
    },
  },
  dark: {
    bgcolor: "#b8860b",
    "&.Mui-selected": {
      bgcolor: "#b8860b",
      outline: "2px solid #945d0b",
      "&:hover": {
        bgcolor: "#876308",
      },
    },
    "&:hover": {
      bgcolor: "#876308",
    },
  },
  icon: {
    color: "#FFC107",
  },
};

const light = { ...styles.root, ...styles.light };
const dark = { ...styles.root, ...styles.dark };

export default memo(NotifButton);
