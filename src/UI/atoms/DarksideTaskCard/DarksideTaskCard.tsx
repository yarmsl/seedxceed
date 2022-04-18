import { memo, Fragment } from "react";
import { Box, Typography, SxProps } from "@mui/material";
import { useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";

const DarksideTaskCard = ({ data }: IDarksideTaskCardProps): JSX.Element => {
  const { darkMode } = useAppSelector((state) => state.ui);
  const { t } = useTranslation("common");

  return (
    <Box sx={styles.wrap}>
      <Typography sx={styles.text}>
        <span>ID: </span>
        {data.id}
      </Typography>
      <Typography sx={styles.text}>
        <span>Ссылки: </span>
        {data.link.includes("http") ? (
          <a
            href={data.link}
            rel="noreferrer"
            target="_blank"
            style={{ color: darkMode ? "#fff" : "#212121" }}
          >
            {data.link}
          </a>
        ) : (
          <Fragment>{data.link}</Fragment>
        )}
      </Typography>
      <Typography sx={styles.text}>
        <span>Телефон: </span>
        {data.phone}
      </Typography>
      <Typography sx={styles.text}>
        <span>Статус: </span>
        {t(data.status)}
      </Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    backgroundColor: "secondary.main",
    borderRadius: "12px",
    p: "15px",
    width: "100%",
    mt: "15px",
  },
  text: {
    "& span": {
      fontWeight: 500,
    },
    "& p": {
      display: "inline",
    },
  },
};

export default memo(DarksideTaskCard);
