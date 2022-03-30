import { memo, useCallback } from "react";
import { Box, Typography, SxProps, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { I18nPhoneInput } from "../../atoms/ControlledTextFields";
import { createSupportThunkAction } from "../../../store/Scanner/Scanner.actions";
import { showSuccessSnackbar, showWarningSnackbar } from "store/Notifications";

const SupportWindow = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["questions", "common"]);
  const methods = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const { reset, handleSubmit } = methods;

  const sendMail = useCallback(
    async (phone: ISendMailReq) => {
      try {
        const res = await dispatch(createSupportThunkAction(phone)).unwrap();
        if (res.error) {
          throw new Error("send mail error");
        }
        reset();
        dispatch(showSuccessSnackbar(t`questions:thanks`));
      } catch (e) {
        dispatch(showWarningSnackbar(t`questions:tryYet`));
      }
    },
    [dispatch, reset, t]
  );

  return (
    <Box sx={styles.wrap}>
      <Typography sx={styles.title}>{t`questions:haveQuest`}</Typography>
      <Typography sx={styles.descr}>{t`questions:help`}</Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendMail)}>
          <I18nPhoneInput
            name="phone"
            label={t`common:phone`}
            sx={styles.phone}
          />
          <Button type="submit" sx={styles.btn}>{t`questions:call`}</Button>
        </form>
      </FormProvider>
      <Box sx={styles.firstCircle}></Box>
      <Box sx={styles.secondCircle}></Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    minWidth: "300px",
    width: "100%",
    backgroundColor: "secondary.light",
    borderRadius: "12px",
    boxShadow: 23,
    p: "22px 16px",
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: 700,
    mb: "25px",
  },
  descr: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: 500,
    mb: "20px",
  },
  phone: {
    width: "100%",
    height: "84px",
    "& > div": {
      backgroundColor: "secondary.main",
    },
    "& label": {
      backgroundColor: "secondary.main",
    },
    "& input": {
      fontSize: "14px",
      fontWeight: 700,
    },
  },
  btn: {
    width: "100%",
    backgroundColor: "primary.main",
    borderRadius: "4px",
    p: "15px 0",
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "primary.dark",
    },
    zIndex: 1,
  },
  firstCircle: {
    position: "absolute",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    backgroundColor: "#2196F3",
    bottom: "-30px",
    right: "-20px",
    zIndex: 0,
  },
  secondCircle: {
    position: "absolute",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    backgroundColor: "#2196F3",
    opacity: "0.7",
    bottom: "-50px",
    right: "40px",
    zIndex: 0,
  },
};

export default memo(SupportWindow);
