import {
  Box,
  Button,
  CircularProgress,
  Divider,
  SxProps,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "store/Auth";
import { showErrorSnackbar, showSuccessSnackbar } from "store/Notifications";
import { EmailField } from "UI/atoms/ControlledTextFields";

const RecoveryPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["auth", "errors"]);
  const nav = useNavigate();
  const methods = useForm<IResetPassReq>({
    defaultValues: {
      email: "",
    },
  });
  const [resetPassByEmail, { isLoading }] = useResetPasswordMutation();
  const { handleSubmit, reset: resetForm } = methods;
  const resetPass = useCallback(
    async (data: IResetPassReq) => {
      try {
        await resetPassByEmail(data).unwrap();
        resetForm();
        dispatch(showSuccessSnackbar(t`auth:recoverySuccess`));
      } catch (e) {
        dispatch(
          showErrorSnackbar(
            e instanceof Error
              ? e.message
              : (e as rtkQueryError).data != null
              ? (e as rtkQueryError).data.message === "user_not_found"
                ? t`errors:userNotFound`
                : (e as rtkQueryError).data.message
              : "Password recovery error"
          )
        );
      }
    },
    [dispatch, resetForm, resetPassByEmail, t]
  );

  return (
    <FormProvider {...methods}>
      <Box sx={styles.root} component="form">
        <Typography
          sx={styles.title}
          variant="h5"
          color="primary"
        >{t`auth:forgot`}</Typography>
        <Typography
          sx={{ mb: "12px" }}
          variant="body2"
          color="text.secondary"
        >{t`auth:resetPass`}</Typography>
        <EmailField
          name="email"
          fullWidth
          label="E-mail"
          autoComplete="email"
          required
          sx={styles.input}
        />
        <Button
          endIcon={isLoading && <CircularProgress color="inherit" size={16} />}
          fullWidth
          variant="contained"
          type="submit"
          onClick={handleSubmit(resetPass)}
        >{t`auth:send`}</Button>
        <Divider sx={styles.divider} />
        <Button onClick={() => nav("/signin")}>{t`auth:remPass`}</Button>
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
  divider: {
    width: "100%",
    mt: "24px",
    mb: "12px",
  },
};

export default RecoveryPassword;
