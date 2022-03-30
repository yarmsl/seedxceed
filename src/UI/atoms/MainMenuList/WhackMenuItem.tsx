import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { memo } from "react";
import { useAppSelector } from "store";

import { ReactComponent as WhackIcon } from "../../../assets/icons/whack.svg";

const WhackMenuItem = () => {
  const { darkMode } = useAppSelector((st) => st.ui);

  return (
    <ListItemButton
      component="a"
      href="https://whack.biz/"
      target="_blank"
      sx={darkMode ? dark : light}
      disableGutters
    >
      <ListItemIcon>
        <WhackIcon />
      </ListItemIcon>
      <ListItemText>Whack!</ListItemText>
      <Box sx={styles.new}>NEW</Box>
    </ListItemButton>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    position: "relative",
    m: "6px 0",
    p: "6px 10px",
    borderRadius: 1,
    whiteSpace: "nowrap",
  },
  new: {
    whiteSpace: "nowrap",
    width: "40px",
    p: "2px 2px",
    fontWeight: "500",
    fontSize: "10px",
    color: "#FFC107",
    border: "1px solid #FFC107",
    borderRadius: 1,
    textAlign: "center",
    position: "absolute",
    left: "180px",
  },
  light: {
    bgcolor: "#FFF8E1",
    "&:hover": {
      bgcolor: "#ffecad",
    },
  },
  dark: {
    bgcolor: "#704214",
    "&:hover": {
      bgcolor: "#593315",
    },
  },
};

const light = { ...styles.root, ...styles.light };
const dark = { ...styles.root, ...styles.dark };

export default memo(WhackMenuItem);
