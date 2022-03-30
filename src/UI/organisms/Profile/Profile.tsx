import { useEffect, useCallback, useMemo, memo } from "react";
import { Box, Typography, SxProps, Avatar, Button } from "@mui/material";
import {
  ControlledTextField,
  EmailField,
  I18nPhoneInput,
} from "../../atoms/ControlledTextFields";
// import { ReactComponent as UploadAvatarSvg } from "../../../assets/icons/uploadAvatar.svg";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getUserDataSelector, editDataProfile } from "../../../store/User";
import { useTranslation } from "react-i18next";
import LangSwitcher from "UI/molecules/LangSwitcher/LangSwitcher";
import { LANG } from "configuration/baseUrls";

const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("profile");
  const userData = useAppSelector(getUserDataSelector);
  const { darkMode } = useAppSelector((st) => st.ui);

  const methods = useForm<IUpdateUserReq>({
    defaultValues: useMemo(
      () => ({
        user_name: userData.first_name || "",
        user_surname: userData.second_name || "",
        user_patronymic: userData.patronymic || "",
        birth_date: userData.birth_date || "",
        user_email: userData.email || "",
        phone: userData.phone || "",
        company_title: userData.company_title || "",
        company_site: userData.company_site || "",
      }),
      [userData]
    ),
  });

  const { reset, handleSubmit } = methods;

  const editProfile = useCallback(
    (data) => {
      dispatch(editDataProfile({ ...data, photo: null }));
    },
    [dispatch]
  );

  useEffect(() => {
    reset({
      user_name: userData.first_name || "",
      user_surname: userData.second_name || "",
      user_patronymic: userData.patronymic || "",
      birth_date: userData.birth_date || "",
      user_email: userData.email || "",
      phone: userData.phone || "",
      company_title: userData.company_title || "",
      company_site: userData.company_site || "",
    });
  }, [reset, userData]);

  return (
    <Box>
      <Typography sx={styles.title}>{t`userSet`}</Typography>
      <Box sx={styles.avatarWrap}>
        <Avatar sx={styles.avatar}></Avatar>
        {/*<Box>*/}
        {/*  <Button*/}
        {/*    variant="outlined"*/}
        {/*    startIcon={<UploadAvatarSvg />}*/}
        {/*  >{t`uploadPhoto`}</Button>*/}
        {/*  <Typography sx={styles.avatarLimit}>{t`limit`}</Typography>*/}
        {/*</Box>*/}
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(editProfile)}>
          <Box sx={styles.inputsWrap}>
            <ControlledTextField
              name="user_name"
              sx={styles.input}
              label={t`firstName`}
            />
            <ControlledTextField
              name="user_surname"
              sx={styles.input}
              label={t`secondName`}
            />
            <ControlledTextField
              name="user_patronymic"
              sx={styles.input}
              label={t`middleName`}
            />
          </Box>
          <Box sx={styles.inputsWrap}>
            <ControlledTextField
              name="birth_date"
              InputLabelProps={{
                shrink: true,
              }}
              label={t`birthDate`}
              type="date"
              sx={{
                ...styles.datePicker,
                "& input::-webkit-calendar-picker-indicator": {
                  filter: darkMode ? "invert(1)" : "none",
                },
              }}
            />
            {LANG === "pt" && (
              <Box>
                <LangSwitcher />
              </Box>
            )}
          </Box>
          <Box sx={styles.inputsWrap}>
            <EmailField
              sx={styles.inputCompany}
              name="user_email"
              label={t`email`}
            />
            <Box sx={{ width: { sm: "100%", md: "calc(50% - 12px)" } }}>
              <I18nPhoneInput
                name="phone"
                label={t`phone`}
                sx={styles.inputPhone}
              />
            </Box>
          </Box>
          <Box sx={styles.inputsWrap}>
            <ControlledTextField
              name="company_title"
              sx={styles.inputCompany}
              label={t`companyName`}
            />

            <ControlledTextField
              name="company_site"
              sx={styles.inputCompany}
              label={t`companyWeb`}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={styles.btn}
          >{t`save`}</Button>
        </form>
      </FormProvider>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  title: {
    fontWeight: 600,
    mb: "25px",
    color: "text.secondary",
  },
  avatarWrap: {
    display: "flex",
    alignItems: "flex-start",
    mb: "25px",
  },
  avatar: {
    width: "85px",
    height: "85px",
    mr: "30px",
  },
  avatarLimit: {
    fontSize: "10px",
    color: "#9e9e9e",
    mt: "5px",
  },
  inputsWrap: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "row",
      lg: "row",
      xl: "row",
    },
    mb: "25px",
  },
  input: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "30%",
      lg: "30%",
      xl: "30%",
    },
    mb: {
      xs: "10px",
      sm: "10px",
      md: "0",
      lg: "0",
      xl: "0",
    },
    "& input": {
      color: "common.black",
      fontWeight: 500,
    },
  },
  datePicker: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "30%",
      lg: "30%",
      xl: "30%",
    },
    mb: "25px",
    "& input": {
      color: "common.black",
      fontWeight: 500,
    },
  },
  inputCompany: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "calc(50% - 12px)",
      lg: "calc(50% - 12px)",
      xl: "calc(50% - 12px)",
    },
    mb: {
      xs: "10px",
      sm: "10px",
      md: "0",
      lg: "0",
      xl: "0",
    },
    "& input": {
      color: "common.black",
      fontWeight: 500,
    },
  },
  inputPhone: {
    width: "100%",
    "& input": {
      color: "common.black",
      fontWeight: 500,
    },
  },
  btn: {
    position: "relative",
    right: "-100%",
    transform: "translateX(-100%)",
    p: "12px 16px",
    fontSize: "14px",
    backgroundColor: "#2196F3",
    borderRadius: "4px",
  },
};

export default memo(Profile);
