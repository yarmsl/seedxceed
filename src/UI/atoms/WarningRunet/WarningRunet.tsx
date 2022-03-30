import { Box, IconButton, SxProps, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { closeModalAction } from "store/ModalStack";

const WarningRunet = () => {
  const { first_name, second_name } = useAppSelector((st) => st.user.data);
  const dispatch = useAppDispatch();
  const name = useMemo(() => {
    if (first_name && second_name) {
      return `${first_name} ${second_name}`;
    } else if (first_name) {
      return first_name;
    } else {
      return "Пользователь";
    }
  }, [first_name, second_name]);
  return (
    <Box sx={styles.root}>
      <IconButton
        onClick={() => dispatch(closeModalAction())}
        sx={styles.close}
        size="small"
      >
        <CloseRoundedIcon fontSize="inherit" />
      </IconButton>
      <Typography align="center" gutterBottom variant="h6">
        Уважаемый {name} !
      </Typography>
      <Typography align="justify">
        В виду текущей ситуации в сети Интернет и в частности в российском
        сегменте сети, работа API маркетплейсов может быть затруднена. Поэтому
        могут наблюдаться замедления обновления данных. Надеемся, что текущие
        проблемы носят временный локальный характер и специалисты на стороне
        маркетплейсов в скором времени решат все трудности.
      </Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "300px", sm: "400px" },
    p: "24px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.default",
  },
  close: {
    position: "absolute",
    top: "6px",
    right: "6px",
  },
};

export default memo(WarningRunet);
