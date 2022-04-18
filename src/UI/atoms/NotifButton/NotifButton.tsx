import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Box,
} from "@mui/material";
import { memo, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "store";
import { keyframes } from "@emotion/react";

const NotifButton = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const isSelected = useMemo(() => loc.pathname === "/live", [loc]);
  const { darkMode } = useAppSelector((st) => st.ui);

  const rec = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
  
`;

  return (
    <ListItemButton
      selected={isSelected}
      onClick={() => nav("live")}
      sx={darkMode ? dark : light}
      disableGutters
    >
      <ListItemIcon>
        <Box sx={styles.recConteiner}>
          <Box
            sx={{
              width: "14px",
              height: "14px",
              backgroundColor: "red",
              animation: `${rec} 1.5s infinite`,
              p: 0,
              display: "block",
              ml: "auto",
              mr: "auto",
              borderRadius: "50%",
              opacity: 1,
              transition: "opacity, 1s, ease-out",
            }}
          ></Box>
        </Box>
      </ListItemIcon>
      <ListItemText>LIVE</ListItemText>
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

  recConteiner: {
    width: "24px",
    height: "24px",
    border: "solid #757575 1px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
  },
};

const light = { ...styles.root, ...styles.light };
const dark = { ...styles.root, ...styles.dark };

export default memo(NotifButton);
