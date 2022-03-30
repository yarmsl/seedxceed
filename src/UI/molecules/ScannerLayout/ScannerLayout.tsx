import { Box, SxProps } from "@mui/material";
import { memo } from "react";
import { IMainScannerProps } from "./types";
import { ReactComponent as BgHeader } from "../../../assets/icons/scannerBgHeader.svg";
import { ReactComponent as BgHeaderDark } from "../../../assets/icons/scannerBgHeaderDark.svg";
import { ReactComponent as BgFooter } from "../../../assets/icons/scannerBgFooter.svg";
import { ReactComponent as BgFooterDark } from "../../../assets/icons/scannerBgFooterDark.svg";

import { useAppSelector } from "store";

const ScannerLayout = ({ children }: IMainScannerProps): JSX.Element => {
  const { darkMode } = useAppSelector((st) => st.ui);

  const styles: Record<string, SxProps> = {
    root: {
      bgcolor: "background.paper",
      borderRadius: 1,
      width: "100%",
      position: "relative",
      zIndex: 1,
    },
    top: {
      width: "100%",
      height: {md: "800px", xs: "1140px"},
      position: "absolute",
      "& svg": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      },
    },
    footer: {
      width: "100%",
      height: {md: "610px", xs: "910px"},

      position: "absolute",
      bottom: "0px",
      "& svg": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        transform: {xs: "scaleX(-1)"}
      },
    },
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.top}>{darkMode ? <BgHeaderDark /> : <BgHeader />}</Box>
      {children}
      <Box sx={styles.footer}>{darkMode ? <BgFooterDark /> : <BgFooter />}</Box>
    </Box>
  );
};

export default memo(ScannerLayout);
