import {
  Box,
  Typography,
  SxProps,
} from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import {ControlledTextField} from "../../atoms/ControlledTextFields";
import { useForm, FormProvider } from "react-hook-form";
import {useAppSelector} from "../../../store"
import {useCreateFavoriteMutation, useStartFavoriteMutation} from "../../../store/DarkSide/DarkSide.service"


const AddFavorite = (): JSX.Element => {
  const {id} = useAppSelector(state => state.user.data)
  const [createTask, {isLoading}] = useCreateFavoriteMutation()
  const [startTask] = useStartFavoriteMutation()
  const methods = useForm({
    defaultValues: {
      links: ""
    }
  })

  const {reset, handleSubmit} = methods

  const changeLinks = (str: string, value: string) => {
    const lengthState = value.length
    if (str.length - lengthState > 1) {
      const substr = str.substr(lengthState, str.length - lengthState)
      if (lengthState) {
        return `${value}\n${substr}`
      } else {
        return `${substr}`
      }
    } else {
      return str
    }
  }

  const sendRequest = async (res: ISendRequestFavorite) => {
    const newLinks = res.links.split('\n').filter(item => item.length)
    const data: ResponseCreateFavorite = await createTask({newLinks, id}).unwrap()
    const task_id = data.task.id
    await startTask({newLinks, id, task_id})
    reset()
  }

  return (
    <Box sx={{width: "100%"}}>
      <Typography>После каждой введённой ссылки вас будет автоматически переносить на новую строку</Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendRequest)}>
          <ControlledTextField
            name="links"
            multiline
            label="Введите ссылки"
            required
            sx={styles.textArea}
            changeLinks={(str: string, value: string) => changeLinks(str, value)}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
          >Отправить</LoadingButton>
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
      minHeight: "100px"
    }
  }
}

export default AddFavorite;