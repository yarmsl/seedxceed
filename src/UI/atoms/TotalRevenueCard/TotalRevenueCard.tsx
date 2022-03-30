import { Box, SxProps, Typography } from "@mui/material";
import { currency } from "lib/helpers";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const TotalRevenueCard = ({ summ }: ITotalRevenueCardProps) => {
  const { t } = useTranslation("cash");
  return (
    <Box sx={styles.root}>
      <Typography
        sx={{
          fontSize: "22px",
          lineHeight: "23px",
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >{t`total`}</Typography>
      <Typography sx={{ flexGrow: 1, fontSize: "34px", fontWeight: 500 }}>
        {currency(summ)}
      </Typography>
      <Typography
        sx={{
          position: "relative",
          zIndex: 10,
          fontSize: "22px",
          fontWeight: 500,
        }}
      >{t`revenue`}</Typography>
      <Box sx={styles.c1} />
      <Box sx={styles.c2} />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    color: "#fff",
    minWidth: { xs: "100%", sm: "50%", md: "320px", lg: "400px" },
    maxWidth: { md: "300px", lg: "352px" },
    width: "100%",
    height: { xs: "200px", sm: "100%" },
    overflow: "hidden",
    position: "relative",
    p: "16px",
    display: "flex",
    flexDirection: "column",
    borderRadius: 1,
    bgcolor: "grey.700",
    userSelect: "none",
  },
  c1: {
    height: "138px",
    width: "138px",
    bgcolor: "grey.800",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: "1rem",
    top: "6rem",
    zIndex: 5,
    opacity: "70%",
  },
  c2: {
    height: "138px",
    width: "138px",
    bgcolor: "grey.600",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: "-4rem",
    top: "5rem",
    zIndex: 10,
  },
};

export default memo(TotalRevenueCard);
