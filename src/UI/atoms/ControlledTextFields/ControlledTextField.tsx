import { TextField } from "@mui/material";
import { ChangeEvent, memo, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IControlledTextFieldProps } from "./types";

const MegaTextField = ({
  children,
  name,
  min,
  max,
  minLength,
  maxLength,
  integer,
  integerWithoutSpace,
  defaultValue,
  locale,
  changeLinks,
  specialOnChange,
  ...rest
}: IControlledTextFieldProps) => {
  const { t } = useTranslation("errors");
  const { control } = useFormContext();
  const specialChange = useCallback(
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      value: string
    ) => {
      if (integer) {
        const res = (+e.target.value.replace(/[^\d]/g, "")).toLocaleString(
          locale || "ru-RU"
        );
        return res === "0" ? "" : res;
      } else if (changeLinks) {
        return changeLinks(e.target.value, value);
      } else if (specialOnChange) {
        specialOnChange();
        return e.target.value;
      } else if (integerWithoutSpace) {
        const res = (+e.target.value.replace(/[^\d]/g, "")).toString();
        return res === "0" ? "" : res;
      } else {
        return e.target.value;
      }
    },
    [integer, changeLinks, specialOnChange, locale, integerWithoutSpace]
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue != null ? defaultValue : undefined}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          value={value}
          onChange={(e) => onChange(specialChange(e, value))}
          error={!!error}
          helperText={error ? error.message : null}
          {...rest}
        >
          {children}
        </TextField>
      )}
      rules={{
        required: rest.required ? `${t`required`}` : false,
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
        min:
          min != null
            ? {
                value: min,
                message: `${t`min`} ${min}`,
              }
            : undefined,
        max:
          max != null
            ? {
                value: max,
                message: `${t`max`} ${max}`,
              }
            : undefined,
      }}
    />
  );
};

export const ControlledTextField = memo(MegaTextField);
