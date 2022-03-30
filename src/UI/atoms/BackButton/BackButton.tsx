import { Box, Button } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const { t } = useTranslation("common");
  const nav = useNavigate();
  return (
    <Box>
      <Button variant="contained" onClick={() => nav(-1)}>{t`back`}</Button>
    </Box>
  );
};

export default memo(BackButton);
