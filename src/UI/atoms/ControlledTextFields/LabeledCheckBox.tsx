import { memo } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { IControlledCheckBoxProps } from "./types";
import { useTranslation } from "react-i18next";

const ControlledCheckBox = ({
  label,
  name,
  required,
  uncontrolled,
  ...rest
}: IControlledCheckBoxProps) => {
  const { t } = useTranslation("errors");
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: uncontrolled ? "row" : "column",
            position: "relative",
            alignItems: "center",
          }}
        >
          {uncontrolled ? (
            <>
              <Checkbox checked={value} onChange={onChange} {...rest} />
              <Typography variant="body2">{label}</Typography>
            </>
          ) : (
            <FormControlLabel
              control={
                <Checkbox checked={value} onChange={onChange} {...rest} />
              }
              label={<Typography variant="body2">{label}</Typography>}
            />
          )}
          {required && error && (
            <FormHelperText
              sx={{
                position: "absolute",
                top: "35px",
                left: "16px",
                whiteSpace: "nowrap",
              }}
              error
            >
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
      rules={{
        required: required ? `${t`confirm2Continue`}` : false,
      }}
    />
  );
};

export const LabeledCheckBox = memo(ControlledCheckBox);
