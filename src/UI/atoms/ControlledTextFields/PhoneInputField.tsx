import {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Country, isPossiblePhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input/input";
import { IPhoneInputFieldProps } from "./types";
import { useTranslation } from "react-i18next";
import { flagUrl } from "lib/helpers";
import CountrySelect from "../CountrySelect/CountrySelect";
import { LANG } from "configuration/baseUrls";

const PhoneInputField = ({ name, ...rest }: IPhoneInputFieldProps) => {
  const { t } = useTranslation("errors");
  const { control, formState, setValue } = useFormContext();
  const { errors } = formState;
  const isValid = useCallback((value) => isPossiblePhoneNumber(value), []);
  const [countryCode, setCountryCode] = useState((LANG === "ru" ? "RU" : "BR") as Country);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const divRef = useRef<HTMLElement>(null);
  const handleOpen = useCallback(() => setAnchor(divRef.current), []);
  const handleClose = useCallback(() => setAnchor(null), []);
  const handleCountry = useCallback(
    (code: Country) => {
      setCountryCode(code);
      handleClose();
      setValue(name, "");
    },
    [handleClose, name, setValue]
  );

  // eslint-disable-next-line react/display-name
  const PassedTextField = forwardRef(
    (
      props: TextFieldProps,
      ref: ForwardedRef<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      return (
        <TextField
          error={!!errors.phone}
          helperText={!errors.phone ? null : errors.phone.message}
          {...props}
          {...rest}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleOpen} size={rest.size || "medium"}>
                  <Box
                    sx={{
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      "& img": {
                        width: "100%",
                      },
                    }}
                  >
                    <img src={flagUrl(countryCode)} alt="flag" />
                  </Box>
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputRef={ref}
        />
      );
    }
  );

  return (
    <>
      <Box sx={{ width: "100%" }} ref={divRef}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={value}
              onChange={onChange}
              international
              withCountryCallingCode
              country={countryCode}
              //@ts-expect-error: Dev of this package is stupid
              inputComponent={PassedTextField}
            />
          )}
          rules={{
            required: rest.required ? `${t`enterPhone`}` : false,
            validate: (value) =>
              isValid(value) ? undefined : `${t`invalidPhone`}`,
          }}
        />
      </Box>
      <CountrySelect
        anchor={anchor}
        handleClose={handleClose}
        handleCountry={handleCountry}
        countryCode={countryCode}
      />
    </>
  );
};

export const I18nPhoneInput = memo(PhoneInputField);
