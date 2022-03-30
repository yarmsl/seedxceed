import Box from "@mui/material/Box";
import { memo, useMemo } from "react";
import { Button, SxProps } from "@mui/material";
import { MarketCardChart } from "../MarketCardChart/MarketCardChart";
import { currency } from "lib/helpers";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MarketCard = ({
  cardTotalSales,
  marketName,
  marketIsActivated,
  marketGraphData,
}: IMarketCardProps): JSX.Element => {
  const Logo = useMemo(
    () => marketPlaceConf.find((conf) => conf.mp === marketName)?.SvgLogo,
    [marketName]
  );
  const nav = useNavigate();
  const { t } = useTranslation("common");

  return (
    <Box
      sx={{
        ...styles.root,
        backgroundColor: CARDS_COLORS[marketName]?.cardBackground || "none",
      }}
    >
      <Box sx={styles.marketLabelWrapper}>{Logo && <Logo />}</Box>
      <Box
        sx={{
          ...styles.activationCircle,
          backgroundColor: marketIsActivated ? "#69F0AE" : "#D84315",
        }}
      />
      <Box
        sx={{
          ...styles.marketDecoreCircleOne,
          backgroundColor:
            CARDS_COLORS[marketName]?.roundOneBackground || "none",
        }}
      />
      <Box
        sx={{
          ...styles.marketDecoreCircleTwo,
          backgroundColor:
            CARDS_COLORS[marketName]?.roundTwoBackground || "none",
        }}
      />
      {marketIsActivated && (
        <Box sx={styles.totalMarketSalesWrapper}>
          {currency(cardTotalSales)}
        </Box>
      )}

      <Box sx={styles.dashboardChartWrapper}>
        {marketGraphData ? (
          <MarketCardChart data={marketGraphData} />
        ) : (
          <Button
            onClick={() => nav("/mp_connect")}
            fullWidth
            variant="contained"
          >{t`connect`}</Button>
        )}
      </Box>
    </Box>
  );
};

const CARDS_COLORS = {
  ym: {
    cardBackground: "#FFC107",
    roundOneBackground: "#FFE57F",
    roundTwoBackground: "#FFF8E1",
  },
  oz: {
    cardBackground: "#3F37C9",
    roundOneBackground: "#4895EF",
    roundTwoBackground: "#4895EF",
  },
  ml: {
    cardBackground: "#FFE57F",
    roundOneBackground: "#FFC107",
    roundTwoBackground: "#FFF8E1",
  },
  wb: {
    cardBackground: "#7209B7",
    roundOneBackground: "#B5179E",
    roundTwoBackground: "#B5179E",
  },
};

const styles: Record<string, SxProps> = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "12px",
    overflow: "hidden",
    maxWidth: "460px",
    minWidth: "250px",
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    position: "relative",
    padding: "16px",
    userSelect: "none",
    cursor: "move",
  },
  marketLabelWrapper: {
    height: "24px",
    maxHeight: "24px",
    p: "1px 0",
    position: "relative",
    zIndex: 15,
    "& svg": {
      height: "100%",
      objectFit: "contain",
      objectPosition: "center",
    },
  },
  activationCircle: {
    height: "14px",
    width: "14px",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: "1rem",
    top: "1rem",
    zIndex: 15,
  },
  marketDecoreCircleOne: {
    height: "138px",
    width: "138px",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: "1rem",
    top: "-3rem",
    zIndex: 5,
    opacity: "70%",
  },
  marketDecoreCircleTwo: {
    height: "138px",
    width: "138px",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: "-4rem",
    top: "-3rem",
    zIndex: 10,
  },
  totalMarketSalesWrapper: {
    color: "#FFFFFF",
    fontSize: "2.125rem",
    fontWeight: "bold",
    zIndex: 10,
  },
  dashboardChartWrapper: {
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
    flexDirection: "column-reverse",
  },
};

export default memo(MarketCard);
