import { memo } from "react";
import { PasswordField } from "../../atoms/ControlledTextFields";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Box, SxProps, Button } from "@mui/material";
import { changePasswordUser } from "../../../store/User/User.actions";

interface IFormValues {
  old_password: string;
  new_password: string;
  repeat_new_password: string;
}

const Safety = (): JSX.Element => {
  const methods = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      repeat_new_password: "",
    },
  });
  const { t } = useTranslation(["common", "profile"]);
  const dispatch = useDispatch();

  const changePassword = (data: IFormValues) => {
    const { new_password, old_password } = data;
    dispatch(changePasswordUser({ new_password, old_password }));
    methods.reset();
  };

  return (
    <>
      <form onSubmit={methods.handleSubmit(changePassword)}>
        <FormProvider {...methods}>
          <PasswordField
            required
            name="old_password"
            label={t`common:currPass`}
            sx={styles.currPass}
          />
          <Box sx={styles.newPassWrap}>
            <PasswordField
              required
              name="new_password"
              label={t`common:newPass`}
              sx={styles.newPassInput}
            />
            <PasswordField
              required
              name="repeat_new_password"
              label={t`common:repeatNewPass`}
              sx={styles.newPassInput}
              confirm="new_password"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={styles.btnSave}
          >{t`profile:save`}</Button>
        </FormProvider>
      </form>
    </>
  );
};

const styles: Record<string, SxProps> = {
  currPass: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "auto",
    },
    mb: "25px",
    "& input": {
      fontWeight: 500,
      color: "common.black",
    },
  },
  newPassWrap: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "row",
    },
    mb: "25px",
  },
  newPassInput: {
    width: {
      sm: "100%",
      md: "calc(50% - 12px)",
    },
    mb: {
      xs: "10px",
      sm: "10px",
      md: "0",
    },
    "& input": {
      fontWeight: 500,
      color: "common.black",
    },
  },
  btnSave: {
    position: "relative",
    left: "100%",
    transform: "translateX(-100%)",
    p: "12px 16px",
  },
};

export default memo(Safety);
