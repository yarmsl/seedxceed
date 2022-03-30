import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Collapse,
  SxProps,
  Typography,
  Tooltip as TTip,
} from "@mui/material";
import { ReactComponent as InfoSvg } from "../../../assets/icons/Info.svg";
import TextButton from "../../atoms/TextButton/TextButton";
import Tooltip from "../../molecules/Tooltip/Tooltip";
import MarketConnectTutorial from "../../molecules/MarketConnectTutorial/MarketConnectTutorial";

export const ConnectMarket = (): JSX.Element => {
  const { t } = useTranslation("apiConnection");
  const [show, setShow] = useState(true);

  const steps: JSX.Element[] = [
    <>{t`tthowGetApiKeyPart1`}</>,
    <>{t`tthowGetApiKeyPart2`}</>,
    <>{t`tthowGetApiKeyPart3`}</>,
  ];

  return (
    <Box sx={styles.root}>
      <Box sx={styles.tooltipWrap}>
        <Box sx={styles.tooltip}>
          <Typography
            variant="h6"
            sx={{ mr: "12px" }}
          >{t`howGetApiKey`}</Typography>
          <TTip
            componentsProps={{ tooltip: { sx: { bgcolor: "transparent" } } }}
            title={<Tooltip steps={steps} />}
          >
            <Box sx={styles.tooltipIcon}>
              <InfoSvg />
            </Box>
          </TTip>
        </Box>
        <TextButton
          text={!show ? `${t`show`}` : `${t`hide`}`}
          action={() => setShow((p) => !p)}
        />
      </Box>
      <Box sx={styles.tutorial}>
        <Collapse in={show}>
          <MarketConnectTutorial />
        </Collapse>
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    p: "12px",
  },
  tooltipWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: { sm: "12px", md: "16px" },
  },
  tooltip: {
    display: "flex",
    alignItems: "center",
  },
  tooltipIcon: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    "& > svg": {
      cursor: "pointer",
    },
    "&:hover > div": {
      opacity: 1,
      zIndex: 1,
    },
  },
  tooltipWindow: {
    position: "absolute",
    top: "32px",
    left: "32px",
    opacity: "0",
    transition: "all 0.3s",
    zIndex: -1,
  },
  tutorial: {
    width: "100%",
  },
};
