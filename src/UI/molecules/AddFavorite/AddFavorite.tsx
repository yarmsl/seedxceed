import { Box, Typography, SxProps, Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import LoadingButton from "@mui/lab/LoadingButton";
import { ControlledTextField } from "../../atoms/ControlledTextFields";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../../../store/Notifications";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  useCreateFavoriteMutation,
  useStartFavoriteMutation,
} from "../../../store/DarkSide/DarkSide.service";

const AddFavorite = ({
  reverse,
  changeReverse,
}: IAddFavoriteProps): JSX.Element => {
  const { id } = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const [createTask, { isLoading }] = useCreateFavoriteMutation();
  const [startTask] = useStartFavoriteMutation();
  const methods = useForm({
    defaultValues: {
      links: "",
    },
  });

  const { reset, handleSubmit } = methods;

  const changeLinks = (str: string, value: string) => {
    const lengthState = value.length;
    if (str.length - lengthState > 1) {
      const substr = str.substr(lengthState, str.length - lengthState);
      if (lengthState) {
        return `${value}\n${substr}`;
      } else {
        return `${substr}`;
      }
    } else {
      return str;
    }
  };

  const sendRequest = async (res: ISendRequestFavorite) => {
    const newLinks = res.links.split("\n").filter((item) => item.length);
    try {
      const data: ResponseCreateFavorite = await createTask({
        newLinks,
        id,
      }).unwrap();
      const task_id = data.task.id;
      await startTask({ newLinks, id, task_id });
      reset();
      dispatch(showSuccessSnackbar("Задача успешно создана"));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const err = e.status === 400 ? `${e.data.message}` : "Ошибка заполнения";
      dispatch(showErrorSnackbar(err));
      throw new Error(err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography>
        После каждой введённой ссылки вас будет автоматически переносить на
        новую строку
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendRequest)}>
          <ControlledTextField
            name="links"
            multiline
            label="Введите ссылки"
            required
            sx={styles.textArea}
            changeLinks={(str: string, value: string) =>
              changeLinks(str, value)
            }
          />
          <Box sx={styles.btns}>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Отправить
            </LoadingButton>
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={changeReverse}
            >
              {reverse ? "По возрастанию" : "По убыванию"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  textArea: {
    width: "100%",
    m: "20px 0",
    "& textarea": {
      minHeight: "100px",
    },
  },
  btns: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default AddFavorite;
