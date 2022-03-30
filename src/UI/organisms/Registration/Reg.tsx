import { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  SxProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  EmailField,
  PasswordField,
  ControlledTextField,
  LabeledCheckBox,
  I18nPhoneInput,
} from "../../atoms/ControlledTextFields";
import { GoogleAuthButton } from "../../atoms/GoogleAuthButton/GoogleAuthButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { singUpViaEmailThunkAction } from "../../../store/Auth";
import { PolicyModal } from "../PolicyModal/policyModal";
import { OfferModal } from "../OfferModal/offerModal";
import { openModal } from "store/ModalStack";
import SmsVerificationForm from "UI/molecules/SmsVerificationForm/SmsVerificationForm";
import { showErrorSnackbar } from "store/Notifications";

interface IRegForm extends ISingUpViaEmailReq {
  confirmPassword: string;
  agreement: boolean;
}

export const Reg = () => {
  const { t } = useTranslation(["auth", "errors"]);
  const dispatch = useAppDispatch();
  const { isLoadingReg } = useAppSelector((st) => st.auth);
  const nav = useNavigate();
  const [regData, setRegData] = useState<ISingUpViaEmailReq | null>(null);
  const [verified, setVerified] = useState(false);

  const toggleVerify = useCallback(
    (condition: boolean) => setVerified(condition),
    []
  );

  const methods = useForm<IRegForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreement: true,
    },
  });
  const { handleSubmit } = methods;

  const signUp = useCallback(
    (data: IRegForm) => {
      const { first_name, last_name, email, phone, password } = data;
      setRegData({ first_name, last_name, email, phone, password });
      dispatch(
        openModal(
          <SmsVerificationForm
            phone={phone}
            toggleVerify={toggleVerify}
            codeLength={4}
          />
        )
      );
    },
    [dispatch, toggleVerify]
  );

  const signUpAsyncAction = useCallback(
    async (data: ISingUpViaEmailReq) => {
      try {
        await dispatch(singUpViaEmailThunkAction(data)).unwrap();
      } catch (e) {
        toggleVerify(false);
        const err = e instanceof Error ? e.message : "regErr";
        dispatch(showErrorSnackbar(t(`errors:${err}`)));
      }
    },
    [dispatch, t, toggleVerify]
  );

  useEffect(() => {
    if (regData != null && verified) {
      signUpAsyncAction(regData);
    }
  }, [regData, dispatch, verified, signUpAsyncAction]);

  return (
    <>
      <FormProvider {...methods}>
        <Box sx={styles.root} component="form">
          <Typography
            sx={styles.title}
            variant="h5"
            color="primary"
          >{t`auth:reg`}</Typography>
          <Typography
            sx={{ mb: "12px" }}
            variant="body2"
            color="text.secondary"
          >{t`subtitle`}</Typography>
          <Box sx={styles.name}>
            <ControlledTextField
              name="first_name"
              required
              label={t`auth:firstName`}
              type="text"
              autoComplete="given-name"
              sx={{ mr: "6px" }}
              size="small"
            />
            <ControlledTextField
              name="last_name"
              required
              label={t`auth:lastName`}
              type="text"
              autoComplete="family-name"
              sx={{ ml: "6px" }}
              size="small"
            />
          </Box>
          <EmailField
            name="email"
            label="E-mail"
            fullWidth
            required
            autoComplete="email"
            sx={{ height: "62px", mb: "10px" }}
            size="small"
          />

          <I18nPhoneInput
            name="phone"
            label={t`auth:phone`}
            size="small"
            type="tel"
            required
            fullWidth
            autoComplete="tel"
            sx={{ height: "62px", mb: "10px" }}
          />

          <PasswordField
            name="password"
            label={t`auth:password`}
            fullWidth
            required
            secure
            minLength={8}
            maxLength={32}
            autoComplete="new-password"
            sx={{ height: "62px", mb: "10px" }}
            size="small"
          />
          <PasswordField
            name="confirmPassword"
            label={t`confirmPass`}
            fullWidth
            required
            autoComplete="new-password"
            confirm="password"
            sx={{ height: "62px", mb: "10px" }}
            size="small"
          />

          <Box sx={{ height: "68px" }}>
            <LabeledCheckBox
              name="agreement"
              required
              uncontrolled
              sx={{ left: "-11px" }}
              label={
                <>
                  {`${t`auth:accept`} `}
                  <Link
                    sx={styles.linkStyle}
                    onClick={() => dispatch(openModal(<PolicyModal />))}
                    underline="hover"
                  >{t`auth:privacyPolicy`}</Link>
                  {` ${t`auth:andAgree`} `}
                  <Link
                    sx={styles.linkStyle}
                    onClick={() => dispatch(openModal(<OfferModal />))}
                    underline="hover"
                  >{t`offer`}</Link>
                </>
              }
            />
          </Box>

          <Button
            endIcon={
              isLoadingReg && <CircularProgress color="inherit" size={16} />
            }
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit(signUp)}
          >
            {t`auth:signUp`}
          </Button>
        </Box>
      </FormProvider>
      <Box sx={styles.dividerBox}>
        <Divider>{t`auth:or`}</Divider>
      </Box>
      <GoogleAuthButton />
      <Button
        onClick={() => nav("/signin")}
        sx={{ mt: "16px" }}
      >{t`auth:haveAcc`}</Button>
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
    m: "10px 0",
    fontWeight: 500,
  },
  name: {
    width: "100%",
    height: "62px",
    mb: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    height: "80px",
    mb: "12px",
  },
  actions: {
    width: "100%",
    mb: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dividerBox: {
    width: "100%",
    p: "12px 0",
    userSelect: "none",
  },
  linkStyle: {
    cursor: "pointer",
  },
};
