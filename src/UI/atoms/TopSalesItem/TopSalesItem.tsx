import { memo } from "react";
import { Box, Typography, SxProps, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TopSalesItem = ({
  title,
  linkPhoto,
  count,
  nmId,
  userId,
  mp,
}: ITopSalesItemProps): JSX.Element => {
  const { t } = useTranslation("common");
  const nav = useNavigate();

  return (
    <>
      <Box
        sx={styles.wrapItem}
        onClick={() => nav(`/product/${nmId}/${userId}/${mp}`)}
      >
        <Box sx={styles.imageWithTitle}>
          <img src={linkPhoto} alt="" />
          <Typography sx={styles.textItem}>{title}</Typography>
        </Box>
        <Typography sx={styles.textItem}>
          {count} {t`pc`}.
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

const styles: Record<string, SxProps> = {
  wrapItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: "8px 0",
    cursor: "pointer",
  },
  imageWithTitle: {
    maxWidth: {
      xs: "80%",
      sm: "100%",
    },
    display: "flex",
    alignItems: "flex-start",
    "& img": {
      borderRadius: "4px",
      height: "40px",
      mr: "10px",
    },
  },
  textItem: {
    fontSize: "14px",
    color: "common.black",
    fontWeight: "500",
    textOverflow: "ellipsis",
    maxWidth: "230px",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
};

export default memo(TopSalesItem);
