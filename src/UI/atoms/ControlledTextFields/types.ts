import {
  TextFieldProps,
  CheckboxProps,
  AutocompleteProps,
} from "@mui/material";

export type IControlledTextFieldProps = Omit<
  TextFieldProps,
  "value" | "onChange" | "error" | "helperText" | "name" | "defaultValue"
> & {
  name: string;
  minLength?: number;
  maxLength?: number;
  integer?: boolean;
  defaultValue?: unknown;
  locale?: string;
  max?: number;
  min?: number;
  changeLinks?: (str: string, value: string) => void;
};

export type IControlledEmailFieldProps = Omit<
  TextFieldProps,
  "type" | "value" | "onChange" | "error" | "helperText" | "name"
> & { name: string };

export type IControlledPasswordFieldProps = Omit<
  TextFieldProps,
  "type" | "value" | "onChange" | "error" | "helperText" | "InputProps" | "name"
> & {
  name: string;
  confirm?: string;
  secure?: boolean;
  minLength?: number;
  maxLength?: number;
};

export type IControlledCheckBoxProps = Omit<
  CheckboxProps,
  "checked" | "onChange"
> & {
  label: string | JSX.Element;
  name: string;
  required?: boolean;
  uncontrolled?: boolean;
};

export type IPhoneInputFieldProps = Omit<
  TextFieldProps,
  "value" | "onChange" | "error" | "helperText" | "InputProps"
> & { name: string };

export type IControlledAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "value" | "onChange" | "renderInput"
> & {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
};
