import { Box, CircularProgress, SxProps, Typography } from "@mui/material";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { memo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  useGetCategoriesOzQuery,
  useLazyGetAllFieldsByCategoryOzQuery,
} from "store/Products";
import { ControlledAutocomplete } from "UI/atoms/ControlledTextFields";
import OzonField from "./OzonField";

const { icon } = marketPlaceConf.find((mp) => mp.mp === "oz") || {
  icon: "",
};

const OzonSpecialFields = () => {
  const { watch, unregister } = useFormContext<INewCardFormFields>();
  const token = watch("shops").find((shop) => shop.mp === "oz")?.token || "";
  const { category_name, category_id } = watch("oz_category") || {
    category_name: "",
    category_id: 0,
  };
  const { data, isLoading } = useGetCategoriesOzQuery({ token });
  const [getFieldsByCategory, { data: fields, isFetching }] =
    useLazyGetAllFieldsByCategoryOzQuery();

  useEffect(() => {
    unregister("oz");
    getFieldsByCategory({
      token,
      category_name,
      category_id,
    });
  }, [category_id, category_name, getFieldsByCategory, token, unregister]);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.root}>
        <Box sx={styles.title}>
          <Typography variant="h6">Дополнительные поля Ozon</Typography>
          <img src={icon} alt="oz" />
        </Box>
        <ControlledAutocomplete<ICategoryOzRes>
          label="Выберите категорию"
          placeholder="Начните вводить для поиска подходящей категории"
          autoSelect
          name="oz_category"
          loading={isLoading}
          loadingText="Категории загружаются"
          noOptionsText="Нет категорий"
          includeInputInList
          filterOptions={(options, state) =>
            options
              .filter(
                (opt) =>
                  opt.category_name
                    .toLowerCase()
                    .indexOf(state.inputValue.toLowerCase()) !== -1
              )
              .slice(0, 100)
          }
          options={data || []}
          getOptionLabel={(opt) => opt.category_name}
          isOptionEqualToValue={(opt, val) =>
            opt.category_name === val.category_name
          }
          required
          size="small"
          sx={styles.input}
        />
        {isFetching ? (
          <Box sx={styles.loading}>
            <CircularProgress color="inherit" size={50} />
          </Box>
        ) : (
          (fields || []).map(
            ({
              id,
              name,
              description,
              type,
              is_collection,
              is_required,
              group_id,
              group_name,
              dictionary_id,
            }) => (
              <OzonField
                key={id}
                attribute_id={id}
                name={name}
                description={description}
                dictionary_id={dictionary_id}
                required={is_required}
                multiple={is_collection}
                type={type}
                category_id={category_id}
                token={token}
              />
            )
          )
        )}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrapper: {
    borderRadius: 1,
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    bgcolor: "common.white",
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
  loading: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    color: "primary.main",
  },
};

export default memo(OzonSpecialFields);
