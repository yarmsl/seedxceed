import { memo, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IControlledPasswordFieldProps } from "./types";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const ControlledPasswordField = ({
  name,
  confirm,
  secure,
  minLength,
  maxLength,
  ...rest
}: IControlledPasswordFieldProps): JSX.Element => {
  const { t } = useTranslation("errors");
  const { control, watch } = useFormContext();
  const [vis, setVis] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={vis ? "text" : "password"}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size={rest.size || "medium"}
                  onClick={() => setVis((p) => !p)}
                >
                  {vis ? (
                    <VisibilityOffRoundedIcon />
                  ) : (
                    <VisibilityRoundedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      )}
      rules={{
        required: rest.required ? `${t`enterPassword`}` : false,
        validate: (value) =>
          confirm != null
            ? value !== watch(confirm)
              ? `${t`passMismatch`}`
              : undefined
            : undefined,
        pattern: secure
          ? {
              value:
                /(?=.*[0-9])(?=.*[a-zа-яA-ZА-Я])[0-9a-zA-Zа-яА-Я!@#$%^&*]/g,
              message: `${t`passContain`}`,
            }
          : undefined,
        minLength:
          minLength != null
            ? {
                value: minLength,
                message: `${t`min`} ${minLength} ${t`symbols`}`,
              }
            : undefined,
        maxLength:
          maxLength != null
            ? {
                value: maxLength,
                message: `${t`max`} ${maxLength} ${t`symbols`}`,
              }
            : undefined,
      }}
    />
  );
};

export const PasswordField = memo(ControlledPasswordField);
