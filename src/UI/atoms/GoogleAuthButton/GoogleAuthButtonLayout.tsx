import { Button } from "@mui/material";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as GoogleLogo } from "../../../assets/icons/googleGLogo.svg";

interface IGoogleAuthButtonLayoutProps {
  href: string;
  variant: "text" | "contained" | "outlined";
  fullWidth: boolean;
}

const GoogleAuthButtonLayout: FC<IGoogleAuthButtonLayoutProps> = ({
  href,
  variant,
  fullWidth,
}) => {
  const { t } = useTranslation("auth");
  return (
    <Button
      startIcon={<GoogleLogo />}
      sx={{
        bgcolor: "grey.50",
        color: "grey.600",
        "&:hover": {
          bgcolor: "grey.300",
        },
      }}
      href={href}
      variant={variant}
      fullWidth={fullWidth}
    >
      {t`logInWithGoogle`}
    </Button>
  );
};

export default memo(GoogleAuthButtonLayout);
