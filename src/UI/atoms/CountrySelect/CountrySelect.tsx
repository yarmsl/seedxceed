import {
  Box,
  ListItemButton,
  ListItemIcon,
  Menu,
  SxProps,
  Typography,
} from "@mui/material";
import { supportedCountriesConf } from "configuration/supportedCountries.conf";
import { memo, useMemo } from "react";
import { ICountrySelectProps } from "./types";
import ru from "react-phone-number-input/locale/ru.json";
import en from "react-phone-number-input/locale/en.json";
import { useAppSelector } from "store";
import { flagUrl } from "lib/helpers";

const CountrySelect = ({
  anchor,
  handleClose,
  handleCountry,
  countryCode,
}: ICountrySelectProps) => {
  const { locale } = useAppSelector((st) => st.ui);

  const countriesList = useMemo(() => {
    if (locale === "ru") {
      return supportedCountriesConf
        .map((c) => ({ code: c, label: ru[c] }))
        .sort((a, b) => a.label.localeCompare(b.label));
    } else {
      return supportedCountriesConf
        .map((c) => ({ code: c, label: en[c] }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }
  }, [locale]);

  return (
    <Menu
      open={!!anchor}
      onClose={handleClose}
      anchorEl={anchor}
      anchorOrigin={{ horizontal: 0, vertical: 0 }}
    >
      {countriesList.map((country) => {
        return (
          <ListItemButton
            selected={country.code === countryCode}
            onClick={() => handleCountry(country.code)}
            key={country.code}
            sx={{ p: "0 12px" }}
          >
            <ListItemIcon>
              <Box sx={styles.img}>
                <img src={flagUrl(country.code)} alt={country.label} />
              </Box>
            </ListItemIcon>
            <Typography variant="body2">{country.label}</Typography>
          </ListItemButton>
        );
      })}
    </Menu>
  );
};

const styles: Record<string, SxProps> = {
  img: {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    "& img": {
      width: "100%",
    },
  },
};

export default memo(CountrySelect);
