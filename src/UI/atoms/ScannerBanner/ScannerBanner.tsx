import { Box, SxProps, Typography } from "@mui/material";
import { ReactComponent as Wave } from "../../../assets/icons/scannerBgHeader.svg";
import { ReactComponent as WaveDark } from "../../../assets/icons/scannerBgHeaderDark.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store";
import { memo } from "react";
const ScannerBanner = () => {
  const { t } = useTranslation("common");
  const { darkMode } = useAppSelector((st) => st.ui);
  return (
    <Box component={Link} to="/scanner" sx={styles.root}>
      <Typography sx={styles.text}>{`${t`try`} ${t`scanner`}`}</Typography>
      <Typography sx={styles.text}>{t`salesIncrease`}</Typography>
      <Box sx={darkMode ? newDark : newLight}>NEW</Box>
      <Box sx={styles.bg}>{darkMode ? <WaveDark /> : <Wave />}</Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    maxWidth: "400px",
    width: "100%",
    height: "150px",
    minWidth: "300px",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    p: "22px 12px 12px",
    color: "#fff",
    userSelect: "none",
    bgcolor: "background.paper",
    boxShadow: 23,
    zIndex: 0,
  },
  text: {
    fontSize: "24px",
    fontWeight: 500,
    zIndex: 4,
  },
  new: {
    border: "2px solid #FFC107",
    borderRadius: 2,
    p: "7px 16px",
    fontSize: "16px",
    lineHeight: "16px",
    fontWeight: 500,
    color: "#FFC107",
    position: "absolute",
    top: "16px",
    right: "16px",
    zIndex: 4,
  },
  newLight: {
    bgcolor: "#FFF8E1",
  },
  newDark: {
    bgcolor: "#734A12",
  },
  bg: {
    width: "100%",
    height: "275px",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: "6px",
    zIndex: 3,
    "& svg": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
};

const newLight = { ...styles.new, ...styles.newLight };
const newDark = { ...styles.new, ...styles.newDark };

export default memo(ScannerBanner);
