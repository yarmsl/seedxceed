import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { useChangePasswordMutation } from "store/Auth";
import { showErrorSnackbar } from "store/Notifications";
import { PasswordField } from "UI/atoms/ControlledTextFields";

const NewPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { t } = useTranslation("auth");
  const [changePass, { isLoading }] = useChangePasswordMutation();
  const methods = useForm({
    defaultValues: {
      password: "",
      password_repeat: "",
    },
  });

  const { handleSubmit } = methods;

  const newPass = useCallback(
    async (data: IChangePassReq) => {
      try {
        await changePass(data).unwrap();
        nav("/");
      } catch (e) {
        dispatch(showErrorSnackbar("Password Recovery Error"));
      }
    },
    [changePass, dispatch, nav]
  );

  return (
    <FormProvider {...methods}>
      <Box sx={styles.root} component="form">
        <Typography
          sx={styles.title}
          variant="h5"
          color="primary"
        >{t`recoveryPass`}</Typography>
        <Typography
          sx={{ mb: "12px" }}
          variant="body2"
          color="text.secondary"
        >{t`createPass`}</Typography>
        <PasswordField
          name="password"
          label={t`auth:password`}
          fullWidth
          required
          secure
          minLength={8}
          maxLength={32}
          autoComplete="new-password"
          sx={styles.input}
        />
        <PasswordField
          name="password_repeat"
          label={t`confirmPass`}
          fullWidth
          required
          autoComplete="new-password"
          confirm="password"
          sx={styles.input}
        />
        <Button
          onClick={handleSubmit(newPass)}
          endIcon={isLoading && <CircularProgress color="inherit" size={16} />}
          fullWidth
          variant="contained"
          type="submit"
        >{t`send`}</Button>
      </Box>
    </FormProvider>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    userSelect: "none",
  },
  title: {
    m: "12px 0",
    fontWeight: 500,
  },
  input: {
    height: "80px",
    mb: "12px",
  },
};

export default NewPassword;
