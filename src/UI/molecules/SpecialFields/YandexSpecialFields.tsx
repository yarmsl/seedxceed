import { Box, SxProps, Typography } from "@mui/material";
import { marketPlaceConf } from "configuration/marketPlace.conf";

const { color, icon } = marketPlaceConf.find((mp) => mp.mp === "ym") || {
  color: "common.white",
  icon: "",
};

const YandexSpecialFields = () => {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.root}>
        <Box sx={styles.title}>
          <Typography variant="h6">
            Дополнительные поля Яндекс Маркет
          </Typography>
          <img src={icon} alt="ym" />
        </Box>
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrapper: {
    bgcolor: "common.white",
    borderRadius: 1,
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    bgcolor: `${color}1A`,
    borderRadius: 1,
    p: "12px",
  },
  title: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    mb: "12px",
    "& img": {
      ml: "12px",
    },
  },
};

export default YandexSpecialFields;
