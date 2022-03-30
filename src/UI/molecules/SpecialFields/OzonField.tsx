import { Box, SxProps, Tooltip } from "@mui/material";
import { memo, useMemo } from "react";
import { useGetAttributeSpecsOzQuery } from "store/Products";
import {
  ControlledAutocomplete,
  ControlledTextField,
} from "UI/atoms/ControlledTextFields";

const OzonField = ({
  attribute_id,
  name,
  description,
  required,
  category_id,
  token,
  multiple,
  type,
  dictionary_id,
}: IOzonFieldProps) => {
  const haveChildren = useMemo(() => dictionary_id > 0, [dictionary_id]);
  const { data, isLoading } = useGetAttributeSpecsOzQuery(
    { category_id, attribute_id, token },
    { skip: !haveChildren }
  );
  const options = useMemo(
    () =>
      Array.isArray(data)
        ? name === "Бренд"
          ? [...data, { attribute_id: 0, attribute_value: "Нет бренда" }]
          : data
        : [],
    [data, name]
  );

  const typeR = useMemo(() => {
    switch (type) {
      case "Decimal":
        return "number";
      case "Integer":
        return "number";
      case "ImageURL":
        return "url";
      case "URL":
        return "url";
      default:
        return "text";
    }
  }, [type]);

  return (
    <Tooltip title={description || ""} placement="right" arrow>
      <Box>
        {!haveChildren ? (
          <ControlledTextField
            defaultValue=""
            name={`oz.${attribute_id}`}
            required={required}
            size="small"
            label={name}
            sx={type === "multiline" ? styles.multiline : styles.input}
            autoComplete="off"
            multiline={type === "multiline"}
            minRows={3}
            maxRows={10}
            type={typeR}
            fullWidth
          />
        ) : multiple ? (
          <ControlledAutocomplete<ISpecsOzRes, true>
            label={name}
            defaultValue={[]}
            placeholder="Начните вводить для поиска"
            name={`oz.${attribute_id}`}
            options={options}
            loading={isLoading}
            loadingText={`${name} загружаются...`}
            noOptionsText={`Нет ${name}`}
            getOptionLabel={(opt) => opt.attribute_value}
            isOptionEqualToValue={(opt, val) =>
              opt.attribute_value === val.attribute_value
            }
            required={required}
            multiple
            size="small"
            sx={styles.multiple}
          />
        ) : (
          <ControlledAutocomplete<ISpecsOzRes>
            label={name}
            defaultValue={null}
            placeholder="Начните вводить для поиска"
            name={`oz.${attribute_id}`}
            options={options}
            loading={isLoading}
            loadingText={`${name} загружаются...`}
            noOptionsText={`Нет ${name}`}
            getOptionLabel={(opt) => opt.attribute_value}
            isOptionEqualToValue={(opt, val) =>
              opt.attribute_value === val.attribute_value
            }
            required={required}
            size="small"
            sx={styles.input}
          />
        )}
      </Box>
    </Tooltip>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
  },
  input: {
    height: "64px",
  },
  multiline: {
    minHeight: "100px",
    mb: "8px",
  },
  multiple: {
    minHeight: "56px",
    mb: "8px",
  },
};

export default memo(OzonField);
