import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Construction } from "../../../assets/common/construct.svg";

const OnReconstructionPage = () => {
  const { t } = useTranslation("common");
  const nav = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden',
        "& svg": {
          height: "350px",
          objectFit: "contain",
        },
      }}
    >
      <Construction />
      <Typography gutterBottom variant="h4">{t`reconstruction`}</Typography>
      <Typography gutterBottom variant="body2">{t`checkNews`}</Typography>
      <Button
        variant="contained"
        onClick={() => nav("/dashboard")}
      >{t`backToMain`}</Button>
    </Box>
  );
};

export default OnReconstructionPage;
