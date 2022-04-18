import { Box, InputAdornment, SxProps, Typography } from "@mui/material";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ControlledTextField } from "UI/atoms/ControlledTextFields";
import YandexField from "./YandexField";

const { icon } = marketPlaceConf.find((mp) => mp.mp === "ym") || {
  icon: "",
};

const count = 6;

const YandexSpecialFields = () => {
  const { t } = useTranslation("newCard");
  const fields = useMemo(() => Array(count).fill("f"), []);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.root}>
        <Box sx={styles.title}>
          <Typography variant="h6">
            Дополнительные поля Яндекс Маркет
          </Typography>
          <img src={icon} alt="ym" />
        </Box>
        {fields.map((_, i) => (
          <YandexField key={i} count={count} index={i} />
        ))}
        <ControlledTextField
          name="certificate"
          fullWidth
          size="small"
          label={t`certificate`}
          autoComplete="off"
          sx={styles.input}
        />
        <ControlledTextField
          name="vendor"
          fullWidth
          size="small"
          label={t`vendor`}
          autoComplete="off"
          sx={styles.input}
        />
        <ControlledTextField
          name="vendorCode"
          fullWidth
          size="small"
          label={t`vendorCode`}
          autoComplete="off"
          sx={styles.input}
        />
        <ControlledTextField
          name="boxCount"
          fullWidth
          size="small"
          label={t`boxCount`}
          type="text"
          integer
          autoComplete="off"
          sx={styles.input}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{t`pcs`}</InputAdornment>
            ),
          }}
        />
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
    borderRadius: 1,
    bgcolor: "common.white",
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
  input: {
    height: "64px",
  },
};

export default memo(YandexSpecialFields);
