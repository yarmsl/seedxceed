import { TextField } from "@mui/material";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IControlledEmailFieldProps } from "./types";

const ControlledEmailField = ({
  name,
  ...rest
}: IControlledEmailFieldProps) => {
  const { t } = useTranslation("errors");
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type="email"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          {...rest}
        />
      )}
      rules={{
        required: rest.required ? `${t`enterEmail`}` : false,
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: `${t`incorrectEmail`}`,
        },
      }}
    />
  );
};

export const EmailField = memo(ControlledEmailField);
