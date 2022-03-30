import {
  AutocompleteInputChangeReason,
  Box,
  SxProps,
  Typography,
} from "@mui/material";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  useLazyGetAllFieldsByCategoryWbQuery,
  useLazyGetCategoriesWbQuery,
} from "store/Products";
import {
  ControlledAutocomplete,
  ControlledTextField,
} from "UI/atoms/ControlledTextFields";

const { color, icon } = marketPlaceConf.find((mp) => mp.mp === "wb") || {
  color: "common.white",
  icon: "",
};

const WildberriesSpecialFields = () => {
  const { watch } = useFormContext<INewCardFormFields>();
  const token = watch("shops").find((shop) => shop.mp === "wb")?.token || "";
  const category_name = watch("wb_category")?.category_name || "";
  const [value, setValue] = useState("");
  const onChange = useCallback(
    (
      event: SyntheticEvent<Element, Event>,
      value: string,
      reason: AutocompleteInputChangeReason
    ) => setValue(value),
    []
  );
  const [getCategories, { data, isFetching }] = useLazyGetCategoriesWbQuery();
  const [getFieldsByCategory, { data: fields }] =
    useLazyGetAllFieldsByCategoryWbQuery();

  useEffect(() => {
    if (value.length === 1) {
      getCategories({
        token,
        w: value,
      });
    }
  }, [getCategories, token, value]);

  useEffect(() => {
    getFieldsByCategory({
      token,
      category_name,
    });
  }, [category_name, getFieldsByCategory, token]);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.root}>
        <Box sx={styles.title}>
          <Typography variant="h6">Дополнительные поля Wildberries</Typography>
          <img src={icon} alt="wb" />
        </Box>
        <ControlledAutocomplete<ICategoryRes>
          label="Выберите категорию"
          placeholder="Начните вводить для поиска подходящей категории"
          name="wb_category"
          loading={isFetching}
          loadingText="Категории загружаются"
          noOptionsText="Нет категорий"
          options={data || []}
          inputValue={value}
          onInputChange={onChange}
          getOptionLabel={(opt) => opt.category_name}
          isOptionEqualToValue={(opt, val) =>
            opt.category_name === val.category_name
          }
          required
          size="small"
          sx={styles.input}
        />
        {(fields || []).map(({ attribute_name, is_required, dictionary }) => (
          <ControlledTextField
            key={attribute_name}
            name={attribute_name}
            required={is_required}
          />
        ))}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrapper: {
    bgcolor: "common.white",
    borderRadius: 1,
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    bgcolor: `${color}33`,
    borderRadius: 1,
    p: "12px",
  },
  title: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    mb: "12px",
    "& img": {
      ml: "12px",
    },
  },
  input: {
    height: "64px",
  },
};

export default WildberriesSpecialFields;
