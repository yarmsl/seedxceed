import { Box, Link, SxProps, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as PhIcon } from "../../../assets/logo/icon.svg";

const ProductPhoto = ({ photo, title, link }: IProductPhotoProps) => {
  const [err, setErr] = useState(false);
  const { t } = useTranslation("products");

  return (
    <Box sx={styles.root}>
      <Box sx={styles.image}>
        {err ? (
          <PhIcon />
        ) : (
          <img src={photo} alt={title} onError={() => setErr(true)} />
        )}
      </Box>
      <Box sx={styles.text}>
        <Typography sx={{ fontSize: "20px" }}>{title}</Typography>
        {link != null && (
          <Link
            sx={{ fontSize: "18px", cursor: "pointer" }}
            target="_blank"
            href={link}
          >{t`productCardLink`}</Link>
        )}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
  },
  image: {
    width: "110px",
    minWidth: "110px",
    height: "110px",
    borderRadius: 1,
    overflow: "hidden",
    boxShadow: 3,
    bgcolor: "background.default",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    "& svg": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  text: {
    height: { xs: "auto", sm: "110px" },
    ml: { xs: "0px", sm: "12px" },
    mt: { xs: "12px", sm: "0px" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
};

export default memo(ProductPhoto);
