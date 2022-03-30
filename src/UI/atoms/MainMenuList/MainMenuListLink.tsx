import { memo, useMemo } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Link as MuiLink,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { pathParse } from "lib/helpers";
import { useAppDispatch, useAppSelector } from "store";
import { closeBurgerMenu } from "store/UI";

const MainMenuListLink = ({
  path,
  title,
  Icon,
  externalPath,
}: IMainMenuItemConf) => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((st) => st.ui);
  const loc = useLocation();
  const selected = useMemo(
    () => pathParse(loc.pathname, "start") === path,
    [loc.pathname, path]
  );

  return (
    <ListItemButton
      selected={selected}
      component={externalPath ? MuiLink : Link}
      to={!externalPath ? path : undefined}
      href={externalPath ? path : undefined}
      target={externalPath ? "_blank" : undefined}
      onClick={() => dispatch(closeBurgerMenu())}
      sx={darkMode ? dark : light}
      disableGutters
    >
      <ListItemIcon sx={styles.icon}>
        <Icon />
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItemButton>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    m: "6px 0",
    p: "6px 10px",
    borderRadius: 1,
    whiteSpace: "nowrap",
    "&:hover": {
      color: "primary.main",
    },
  },
  light: {
    "&.Mui-selected": {
      color: "primary.main",
      bgcolor: "#E3F2FD",
    },
  },
  dark: {
    "&.Mui-selected": {
      color: "primary.main",
    },
  },
  icon: {
    color: "inherit",
  },
};

const light = { ...styles.root, ...styles.light };
const dark = { ...styles.root, ...styles.dark };

export default memo(MainMenuListLink);
