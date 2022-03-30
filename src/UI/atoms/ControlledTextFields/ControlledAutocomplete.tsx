import { Autocomplete, TextField } from "@mui/material";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IControlledAutocompleteProps } from "./types";

const MegaAutocomplete = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  name,
  required,
  label,
  placeholder = "",
  ...rest
}: IControlledAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const { t } = useTranslation("errors");
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={rest.defaultValue != null ? rest.defaultValue : rest.multiple ? [] : null}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          value={value}
          onChange={(_, v) => onChange(v)}
          {...rest}
          renderInput={(params) => (
            <TextField
              placeholder={placeholder}
              error={!!error}
              required={required}
              helperText={error ? error.message : null}
              {...params}
              label={label && label}
            />
          )}
        />
      )}
      rules={{
        required: required ? `${t`required`}` : false,
      }}
    />
  );
};

export const ControlledAutocomplete = memo(
  MegaAutocomplete
) as typeof MegaAutocomplete;
