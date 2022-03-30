import { Box, SxProps, Typography } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Logotype } from "../../../assets/logo.svg";

interface ILogoProps {
  gap?: boolean;
}

const Logo = ({ gap }: ILogoProps): JSX.Element => {
  const { t } = useTranslation("common");
  return (
    <Box sx={styles.root}>
      <Box sx={styles.logo}>
        <Logotype />
      </Box>
      {gap && <Box sx={styles.gap}></Box>}
      <Typography sx={styles.title}>{t`SeedXceed`}</Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    height: "32px",
    display: "flex",
    alignItems: "center",
    userSelect: "none",
    color: "common.black",
  },
  logo: {
    minWidth: "32px",
    width: "32px",
    height: "100%",
    "& svg": {
      width: "100%",
      height: "100%",
    },
  },
  gap: {
    minWidth: "16px",
    width: "16px",
  },
  title: {
    fontFamily: "Manrope",
    fontSize: "24px",
    ml: "6px",
  },
};

export default memo(Logo);
