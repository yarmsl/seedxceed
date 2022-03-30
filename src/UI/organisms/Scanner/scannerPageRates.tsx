import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Box, Typography, SxProps } from "@mui/material";
import { scannerRatesConf } from "configuration/scannerPage.conf";
import ScannerRatesCard from "UI/atoms/ScannerRatesCard/ScannerRatesCard";

export const ScannerPageRates = () => {
  const { t } = useTranslation("scanner");

  const cards = useMemo(
    () =>
      scannerRatesConf.map((card) => ({
        ...card,
        title: t(card.title),
        description: t(card.description),
        priceFor: t(card.priceFor),
        buttonText: t(card.buttonText),
        price: card.price,
      })),
    [t]
  );

  return (
    <>
      <Box>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Typography variant="h6" sx={styles.title}>
            {t`rates`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row", sm:"row" },
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {cards.map((card, i) => (
            <ScannerRatesCard key={card.title} {...card} index={i + 1} />
          ))}
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root:{ 
    width: { xs: "calc(100% - 12px)", sm: "509px" },
  },
  title: {
    p: "60px 0 32px 0",
    color: "common.black",
    fontSize: {xs: "24px"},
    fontWeight: {xs: 700}
  },
};
