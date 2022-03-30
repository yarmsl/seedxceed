import { useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  SxProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { GoogleAuthButton } from "../../atoms/GoogleAuthButton/GoogleAuthButton";
import { useForm, FormProvider } from "react-hook-form";
import {
  EmailField,
  // LabeledCheckBox,
  PasswordField,
} from "../../atoms/ControlledTextFields";
import { useNavigate } from "react-router-dom";
import { singInViaEmailThunkAction } from "../../../store/Auth";
import { useAppDispatch, useAppSelector } from "../../../store";
import { showErrorSnackbar } from "store/Notifications";

export const Auth = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["auth", "errors"]);
  const { isLoadingAuth } = useAppSelector((st) => st.auth);
  const nav = useNavigate();
  const methods = useForm<ISingInViaEmail>({
    defaultValues: { email: "", password: "", rememberMe: true },
  });
  const { handleSubmit } = methods;

  const signIn = useCallback(
    async (data: ISingInViaEmail) => {
      try {
        await dispatch(singInViaEmailThunkAction(data)).unwrap();
      } catch (e) {
        const err = e instanceof Error ? e.message : "authErr";
        dispatch(showErrorSnackbar(t(`errors:${err}`)));
      }
    },
    [dispatch, t]
  );

  return (
    <>
      <FormProvider {...methods}>
        <Box component="form" sx={styles.root}>
          <Typography
            sx={styles.title}
            variant="h5"
            color="primary"
          >{t`auth:auth`}</Typography>
          <Typography
            sx={{ mb: "12px" }}
            variant="body2"
            color="text.secondary"
          >{t`subtitle`}</Typography>

          <EmailField
            name="email"
            label="E-mail"
            fullWidth
            required
            autoComplete="email"
            sx={{ height: "80px", mb: "12px" }}
          />
          <PasswordField
            name="password"
            label={t`auth:password`}
            fullWidth
            required
            autoComplete="current-password"
            sx={{ height: "80px" }}
          />
          <Box sx={styles.actions}>
            {/* <LabeledCheckBox name="rememberMe" label={t`remember`} /> */}
            <Button onClick={() => nav("/recovery")}>{t`forgot`}</Button>
          </Box>

          <Button
            endIcon={
              isLoadingAuth && <CircularProgress color="inherit" size={16} />
            }
            onClick={handleSubmit(signIn)}
            type="submit"
            fullWidth
            variant="contained"
          >
            {t`auth:signIn`}
          </Button>
        </Box>
      </FormProvider>
      <Box sx={styles.dividerBox}>
        <Divider>{t`auth:or`}</Divider>
      </Box>
      <GoogleAuthButton />
      <Button
        onClick={() => nav("/signup")}
        sx={{ mt: "16px" }}
      >{t`auth:noAcc`}</Button>
    </>
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
  actions: {
    width: "100%",
    mb: "16px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dividerBox: {
    width: "100%",
    p: "12px 0",
    userSelect: "none",
  },
};
