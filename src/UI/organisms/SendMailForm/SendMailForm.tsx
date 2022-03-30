import { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, Link, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ControlledTextField,
  LabeledCheckBox,
} from "../../atoms/ControlledTextFields";
import { useDispatch } from "react-redux";
import { I18nPhoneInput } from "../../atoms/ControlledTextFields/PhoneInputField";
import { sendMailThunkAction } from "store/Scanner/Scanner.actions";
import { PolicyModal } from "../PolicyModal/policyModal";
import { openModal } from "store/ModalStack";

interface ISendForm {
  url: string;
  phone: string;
  agreement: boolean;
}

export const SendMailForm = () => {
  const { t } = useTranslation(["scanner", "auth"]);
  const dispatch = useDispatch();

  const methods = useForm<ISendForm>({
    defaultValues: {
      url: "",
      phone: "",
      agreement: true,
    },
  });
  const { handleSubmit } = methods;

  const send = useCallback(
    (data: ISendForm) => {
      const { url, phone, agreement } = data;
      dispatch(
        sendMailThunkAction({
          url,
          phone,
          agreement,
        })
      );
    },
    [dispatch]
  );

  return (
    <>
      <FormProvider {...methods}>
        <Box sx={styles.root} component="form">
          <Typography
            sx={{ mt: "18px", fontWeight: "bold", fontSize: "16px" }}
          >{t`getConsult`}</Typography>
          <I18nPhoneInput
            name="phone"
            label={t`auth:phone`}
            type="tel"
            required
            fullWidth
            autoComplete="tel"
            sx={{ height: "80px", mb: "10px", mt: "23px" }}
          />
          <ControlledTextField
            name="url"
            label={t`cardURL`}
            placeholder="Укажите ссылку"
            sx={{ height: "80px", mb: "10px" }}
            fullWidth
            required
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
                </>
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end ",
              width: "100%",
              justifyContent: "end",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(send)}
            >
              {t`send`}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "calc(100% - 12px)", sm: "400px" },
    boxSizing: "border-box",
    p: "12px",
    m: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    bgcolor: "background.default",
    borderRadius: 1,
  },
  boxButton: {
    display: "flex",
    alignItems: "flex-end ",
    width: "100%",
    justifyContent: "end",
  },
  title: {
    m: "10px 0",
    fontWeight: 500,
  },
  name: {
    width: "100%",
    height: "64px",
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
  inputText: {
    fontSize: "14px",
    color: "#9E9E9E",
    height: "64px",
    mb: "10px",
  },
};
