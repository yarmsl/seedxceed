import { Box, SxProps, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { currency } from "lib/helpers";

const SalesCard = ({ data }: ISalesCardProps) => {
  const {
    title,
    amountTitle,
    countTitle,
    amount,
    count,
    amountChange,
    countChange,
  } = data;
  const { t } = useTranslation("products");
  const isCount = useMemo(() => countTitle === "quantity", [countTitle]);
  return (
    <Box sx={styles.root}>
      <Typography gutterBottom variant="h6">
        {t(title)}
      </Typography>
      <Box sx={styles.row}>
        <Typography>{t(amountTitle)}</Typography>
        <Box sx={styles.col}>
          <Box sx={styles.marked}>
            {amountChange > 0 ? (
              <ExpandLessRoundedIcon sx={styles.rise} />
            ) : amountChange < 0 ? (
              <ExpandMoreRoundedIcon sx={styles.fall} />
            ) : null}
            <Typography>{currency(amount)}</Typography>
          </Box>
          <Typography
            color={
              amountChange > 0
                ? "#00C853"
                : amountChange < 0
                ? "#D84315"
                : undefined
            }
            gutterBottom
            variant="body2"
          >
            {amountChange === 0
              ? null
              : amountChange > 0
              ? `+${currency(amountChange)}`
              : currency(amountChange)}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.row}>
        <Typography>{t(countTitle)}</Typography>
        <Box sx={styles.col}>
          <Box sx={styles.marked}>
            {countChange > 0 ? (
              <ExpandLessRoundedIcon sx={styles.rise} />
            ) : countChange < 0 ? (
              <ExpandMoreRoundedIcon sx={styles.fall} />
            ) : null}
            <Typography>
              {isCount ? `${count} ${t`pcs`}` : currency(count)}
            </Typography>
          </Box>
          <Typography
            color={
              countChange > 0
                ? "#00C853"
                : countChange < 0
                ? "#D84315"
                : undefined
            }
            variant="body2"
          >
            {countChange === 0
              ? null
              : isCount
              ? countChange < 0
                ? `${countChange} ${t`pcs`}`
                : `+${countChange} ${t`pcs`}`
              : countChange < 0
              ? currency(countChange)
              : `+${currency(countChange)}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    p: "12px",
    display: "flex",
    flexDirection: "column",
    bgcolor: "secondary.main",
    borderRadius: 1,
    userSelect: "none",
    cursor: "move",
  },
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  marked: {
    display: "flex",
  },
  rise: {
    color: "#00C853",
  },
  fall: {
    color: "#D84315",
  },
};

export default memo(SalesCard);
