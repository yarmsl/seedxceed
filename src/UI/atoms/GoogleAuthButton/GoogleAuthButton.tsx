import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PASSPORT_URL } from "../../../configuration/baseUrls";
import { ReactComponent as GoogleLogo } from "../../../assets/icons/googleGLogo.svg";

export const GoogleAuthButton = (): JSX.Element => {
  const { t } = useTranslation("auth");
  return (
    <Button
      href={`${PASSPORT_URL}/api/auth/google`}
      variant="contained"
      startIcon={<GoogleLogo />}
      fullWidth
      sx={{
        bgcolor: "grey.50",
        color: "grey.600",
        "&:hover": {
          bgcolor: "grey.300",
        },
      }}
    >{t`logInWithGoogle`}</Button>
  );
};
