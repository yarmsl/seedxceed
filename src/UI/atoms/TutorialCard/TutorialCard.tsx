import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { TutorialCardStyles } from "./styles";
import { marketPlaceConf } from "configuration/marketPlace.conf";

const TutorialCard = ({
  marketName,
  selected,
  action,
}: ITutorialCardProps): JSX.Element => {
  const Logo = useMemo(
    () => marketPlaceConf.find((conf) => conf.mp === marketName)?.SvgLogo,
    [marketName]
  );
  const { t } = useTranslation("apiConnection");

  return (
    <Box
      sx={{
        ...TutorialCardStyles.wrapCard,
        backgroundColor: CARDS_COLORS[marketName]?.cardBackground || "none",
        border: selected ? "2px solid #2196F3" : "none",
        transform: selected ? "scale(1.08)" : "scale(1)",
      }}
      onClick={action}
    >
      <Box sx={{ ...TutorialCardStyles.label }}>
        {marketName !== "tutorial" ? (
          Logo && <Logo />
        ) : (
          <Typography
            sx={{ ...TutorialCardStyles.textTutorial }}
          >{t`tutorial`}</Typography>
        )}
      </Box>
      <Box
        sx={{
          ...TutorialCardStyles.firstCircle,
          backgroundColor:
            CARDS_COLORS[marketName]?.roundOneBackground || "none",
        }}
      ></Box>
      <Box
        sx={{
          ...TutorialCardStyles.secondCircle,
          backgroundColor:
            CARDS_COLORS[marketName]?.roundTwoBackground || "none",
        }}
      ></Box>
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
  tutorial: {
    cardBackground: "#90caf9",
    roundOneBackground: "#FAFAFA",
    roundTwoBackground: "#FFFFFF",
  },
};

export default memo(TutorialCard);
