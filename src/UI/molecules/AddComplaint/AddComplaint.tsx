import {memo, useMemo, useState} from 'react';
import {
  Box,
  SxProps,
  TextField,
  MenuItem,
  Button,
  CircularProgress
} from "@mui/material"
import {Controller, useForm} from "react-hook-form"
import {useAppSelector} from "../../../store"
import {useDispatch} from "react-redux"
import {useLazyGetCompaniesComplaintsQuery, useAddParserTaskMutation} from "../../../store/DarkSide/DarkSide.service";
import {getUserDataSelector} from "../../../store/User"
import {showErrorSnackbar} from "../../../store/Notifications";

const whatMatter = ["Проблемы с предложением", "Проблемы с магазином"];
const storeReasons = [
  "Неправильные юридические данные",
  "Подозрения в накрутке отзывов на Маркете",
  "Сходные магазины (аффилиаты)",
  "Продажа поддельной продукции",
  "Продажа запрещённых товаров",
  "Продажа товаров, бывших в употреблении",
  "Подозрение в мошенничестве",
  "Другое",
];

const offerReasons = [
  "Нет в наличии",
  "Неверная цена",
  "Сайт магазина недоступен",
  "Неверная категория/модель",
  "Неверные срок/стоимость доставки",
  "Другое",
];

const AddComplaint = (): JSX.Element => {
  const dispatch = useDispatch()
  const [dis, setDis] = useState(true);
  const {first_name, email} = useAppSelector(getUserDataSelector)
  const [
    queryCompanies,
    { currentData: resCompanies, isLoading: isCompaniesLoading },
  ] = useLazyGetCompaniesComplaintsQuery();
  const [addTask, { isLoading }] = useAddParserTaskMutation();
  const { handleSubmit, control, reset, resetField, watch, formState, setError } = useForm({
    defaultValues: {
      search_string: "",
      without_company: [],
      brands: "",
      what_matter: "",
      reason: "",
      desc_problem: "",
      name: "",
      email: "",
    },
  });

  const wm = watch("what_matter");
  const { errors } = formState;

  const reasons = useMemo(() => {
    switch (wm) {
      case "Проблемы с предложением":
        return offerReasons;
      case "Проблемы с магазином":
        return storeReasons;
      default:
        return [];
    }
  }, [wm]);

  const companies = useMemo(
    () => Array.isArray(resCompanies?.response || "") ? resCompanies?.response : [],
    [resCompanies]
  )

  const handleAddTask = handleSubmit(async (data) => {
    const whiteList = [...data.without_company, ...data.brands.split(",").filter(br => br !== "").map(br => br.trim())]
    if (whiteList.length === 0) {
      setError("brands", { type: "required" });
      setError("without_company", { type: "required" });
      return;
    }
    try {
      await addTask({
        search_string: data.search_string,
        without_company: whiteList,
        page_count: 1,
        what_matter: data.what_matter,
        reason: data.reason,
        desc_problem: data.desc_problem,
        name: data.name ? data.name : first_name,
        email: data.email ? data.email : email,
      }).unwrap();
      reset();
      setDis(true);
    } catch (e) {
      const err =
        e instanceof Error ? `User Data Error: ${e.message}` : "User Data Error";
      dispatch(showErrorSnackbar(err));
      reset();
      setDis(true);
      throw new Error(err);
    }
  });


  return (
    <Box
      sx={styles.wrap}
      component="form"
    >
      <Controller
        name="search_string"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onBlur={() => {
              value !== "" && queryCompanies(value);
            }}
            size="small"
            label="Поисковой запрос"
            fullWidth
            required
            sx={{ height: "75px" }}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e);
              setDis(false);
              resetField("without_company");
            }}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: "Введите запрос" }}
      />

      <Box
        sx={{
          width: "100%",
          height: "75px",
          display: "flex",
          position: "relative",
        }}
      >
        <Controller
          name="without_company"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              disabled={dis ? dis : (companies ? companies.length < 1 : false)}
              size="small"
              label="Выберите компании (белый список)"
              select
              required
              fullWidth
              SelectProps={{
                multiple: true,
                MenuProps: {
                  PaperProps: { style: { maxHeight: 320, overflowY: "auto" } },
                },
              }}
              type="text"
              value={value}
              onChange={onChange}
              error={isCompaniesLoading ? false : !!error}
              helperText={
                isCompaniesLoading
                  ? "Идёт загрузка списка компаний"
                  : error
                    ? error.message
                    : null
              }
            >
              {companies?.map((company, i) => (
                <MenuItem key={i} value={company}>
                  {company}
                </MenuItem>
              ))}
            </TextField>
          )}
          rules={{
            required: "Выберите хотя бы одну компанию для белого списка",
          }}
        />

        {isCompaniesLoading && (
          <CircularProgress
            size={24}
            sx={{ position: "absolute", right: "-40px", top: "8px" }}
          />
        )}
      </Box>

      <Controller
        name="brands"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            label="Введите бренды (белый список)"
            multiline
            minRows={2}
            maxRows={2}
            fullWidth
            required
            sx={{ height: "94px" }}
            type="text"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{
          required: errors.without_company
            ? "Введите хотя бы один бренд для белого списка"
            : undefined,
        }}
      />

      <Controller
        name="what_matter"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            label="Что произошло?"
            select
            required
            fullWidth
            sx={{ height: "75px" }}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e);
              resetField("reason");
            }}
            error={!!error}
            helperText={error ? error.message : null}
          >
            {whatMatter.map((wm, i) => (
              <MenuItem key={i} value={wm}>
                {wm}
              </MenuItem>
            ))}
          </TextField>
        )}
        rules={{ required: "Что произошло?" }}
      />

      <Controller
        name="reason"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            label="Выберите причину"
            select
            required
            fullWidth
            sx={{ height: "75px" }}
            type="text"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          >
            {reasons.map((reason, i) => (
              <MenuItem key={i} value={reason}>
                {reason}
              </MenuItem>
            ))}
          </TextField>
        )}
        rules={{ required: "Выберите причину" }}
      />

      <Controller
        name="desc_problem"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            label="Опишите проблему"
            multiline
            minRows={3}
            maxRows={3}
            fullWidth
            required
            sx={{ height: "108px" }}
            type="text"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: "Опишите проблему" }}
      />

      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            size="small"
            label="ФИО"
            fullWidth
            sx={{ height: "75px" }}
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            label="E-mail"
            fullWidth
            sx={{ height: "75px" }}
            type="email"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Введите корректный email",
          },
        }}
      />

      <Button
        variant="contained"
        onClick={handleAddTask}
        endIcon={isLoading && <CircularProgress color="inherit" size={20} />}
      >
        Отправить
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    width: "360px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}

export default memo(AddComplaint);