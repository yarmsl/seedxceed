import { CircularProgress, InputAdornment, MenuItem } from "@mui/material";
import { FC, memo, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useGetCategoriesYmQuery } from "store/Products";
import { ControlledTextField } from "UI/atoms/ControlledTextFields";

const YandexField: FC<IYandexFieldProps> = ({ index, count }) => {
  const { watch, unregister, setValue } = useFormContext<INewCardFormFields>();
  const id = watch(`ym.category${index - 1}`);
  const value = watch(`ym.category${index}`);
  const ym_category = watch("ym_category");
  const idQuery = useMemo(() => (index === 0 ? 8734 : id), [id, index]);
  const { data, isFetching } = useGetCategoriesYmQuery(idQuery, {
    skip: !idQuery,
  });

  const categories = useMemo(
    () => (idQuery ? (Array.isArray(data) ? data : []) : []),
    [data, idQuery]
  );

  const title = useMemo(
    () => categories.find((c) => c.id === value)?.title || "",
    [categories, value]
  );

  const fieldsToUnregister = useMemo(
    () =>
      Array(count - (index + 1))
        .fill(0)
        .map((_, i) => `ym.category${count - 1 - i}`),
    [count, index]
  );

  useEffect(() => {
    if (ym_category != null) {
      ym_category[index] = title;
      setValue("ym_category", ym_category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, setValue, title]);

  if (categories.length === 0) return null;

  return (
    <ControlledTextField
      defaultValue=""
      name={`ym.category${index}`}
      label="Выберите категорию"
      specialOnChange={() => {
        unregister(fieldsToUnregister as "ym."[]);
      }}
      select
      required
      size="small"
      sx={{ height: "64px" }}
      SelectProps={{
        MenuProps: { sx: { maxHeight: "400px" } },
        endAdornment: (
          <InputAdornment position="end">
            {isFetching && <CircularProgress size={18} color="primary" />}
          </InputAdornment>
        ),
      }}
    >
      {categories.map(({ id, title }) => (
        <MenuItem key={id} value={id}>
          {title}
        </MenuItem>
      ))}
    </ControlledTextField>
  );
};

export default memo(YandexField);
