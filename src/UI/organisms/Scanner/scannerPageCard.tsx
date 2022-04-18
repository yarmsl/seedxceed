import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Box, Typography, SxProps } from "@mui/material";
import { scannerConf } from "configuration/scannerPage.conf";
import ScannerDescriptionCard from "UI/atoms/ScannerDescriptionCard/ScannerDescriptionCard";
import { ReactComponent as LineIcon } from "../../../../src/assets/icons/scannerLine.svg";

export const ScannerPageCard = () => {
  const { t } = useTranslation("scanner");
  const cards = useMemo(
    () =>
      scannerConf.map((card) => ({
        ...card,
        title: t(card.title),
        description: t(card.description),
      })),
    [t]
  );

  return (
    <>
      <Box sx={styles.root}>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            zIndex: 2,
            position: "relative",
          }}
        >
          <Typography variant="h6" sx={styles.title}>
            {t`weOffer`}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {cards.map((card) => (
            <ScannerDescriptionCard key={card.title} {...card} />
          ))}
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "60px" }}
        >
          <LineIcon />
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    zIndex: 2,
    position: "relative",
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
  },
  title: {
    p: "8px 0",
    color: "#FFFFFF",
    mt: { xs: "30px" },
  },
  icons: {
    paddingTop: "32px",
  },
};
