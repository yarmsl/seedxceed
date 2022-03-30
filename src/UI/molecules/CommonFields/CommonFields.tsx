import {
  Box,
  InputAdornment,
  MenuItem,
  SxProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ControlledTextField } from "UI/atoms/ControlledTextFields";

const vat: { label: string; value: TVat }[] = [
  { label: "0%", value: "0" },
  { label: "10%", value: "0.1" },
  { label: "20%", value: "0.2" },
];

const CommonFields = () => {
  const { t } = useTranslation("newCard");
  return (
    <Box sx={styles.root}>
      <Typography variant="h6" gutterBottom>
        {t`commonFields`}
      </Typography>
      <Box sx={styles.wrapper}>
        <Box>
          <ControlledTextField
            name="title"
            fullWidth
            size="small"
            label={t`productTitle`}
            required
            autoComplete="off"
            sx={styles.input}
          />
          <ControlledTextField
            name="country"
            fullWidth
            size="small"
            label={t`producerCountry`}
            autoComplete="off"
            sx={styles.input}
          />
          <ControlledTextField
            name="brand"
            fullWidth
            size="small"
            label={t`brand`}
            autoComplete="off"
            sx={styles.input}
          />
          <ControlledTextField
            name="barcode"
            fullWidth
            size="small"
            label={t`sku`}
            autoComplete="off"
            sx={styles.input}
          />
          <ControlledTextField
            name="old_price"
            fullWidth
            size="small"
            label={t`oldPrice`}
            type="text"
            integer
            autoComplete="off"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{t`currency`}</InputAdornment>
              ),
            }}
          />
          <ControlledTextField
            name="premium_price"
            fullWidth
            size="small"
            label={t`discontPrice`}
            type="text"
            integer
            autoComplete="off"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{t`currency`}</InputAdornment>
              ),
            }}
          />
          <ControlledTextField
            name="price"
            fullWidth
            size="small"
            label={t`price`}
            required
            type="text"
            integer
            autoComplete="off"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{t`currency`}</InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <ControlledTextField
            name="depth"
            fullWidth
            size="small"
            label={t`depth`}
            required
            type="text"
            integer
            autoComplete="off"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{t`sm`}</InputAdornment>
              ),
            }}
          />
          <ControlledTextField
            name="width"
            fullWidth
            size="small"
            label={t`width`}
            required
            type="text"
            integer
            autoComplete="off"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{t`sm`}</InputAdornment>
              ),
            }}
          />
          <ControlledTextField
            name="height"
            fullWidth
            size="small"
            label={t`height`}
            required
            type="text"
            integer
            autoComplete="off"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{t`sm`}</InputAdornment>
              ),
            }}
          />
          <ControlledTextField
            name="weight"
            fullWidth
            size="small"
            label={t`weight`}
            required
            type="text"
            integer
            autoComplete="off"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{t`kg`}</InputAdornment>
              ),
            }}
          />
          <ControlledTextField
            name="vat"
            fullWidth
            size="small"
            label={t`vat`}
            required
            autoComplete="off"
            sx={styles.input}
            select
          >
            {vat.map((v) => (
              <MenuItem key={v.value} value={v.value}>
                {v.label}
              </MenuItem>
            ))}
          </ControlledTextField>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {t`requiredFields`}
      </Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    bgcolor: "common.white",
    borderRadius: 1,
    p: "12px",
  },
  wrapper: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    "&>*:first-of-type": {
      width: { xs: "100%", sm: "50%" },
      pr: { xs: "0px", sm: "6px" },
    },
    "&>*:last-of-type": {
      width: { xs: "100%", sm: "50%" },
      pl: { xs: "0px", sm: "6px" },
    },
  },
  input: {
    height: "65px",
  },
};

export default CommonFields;
