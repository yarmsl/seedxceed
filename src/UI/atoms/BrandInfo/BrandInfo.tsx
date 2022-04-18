import { memo } from "react";
import { Box, Divider, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const BrandInfo = ({ summary }: IBrandInfoProps): JSX.Element => {
  const { t } = useTranslation(["common", "products", "date"]);

  return (
    <Box sx={styles.wrap}>
      <Typography sx={styles.title}>{t`common:info`}</Typography>
      <Box sx={styles.wrapItem}>
        <Typography sx={styles.textItem}>{t`products:goodsCount`}</Typography>
        <Typography sx={styles.textItem}>
          {summary.products_count} {t`common:pc`}.
        </Typography>
      </Box>
      <Divider />
      <Box sx={styles.wrapItem}>
        <Typography sx={styles.textItem}>{t`products:ordersCount`}</Typography>
        <Typography sx={styles.textItem}>
          {summary.orders} {t`common:pc`}.
        </Typography>
      </Box>
      <Divider />
      <Box sx={styles.wrapItem}>
        <Typography sx={styles.textItem}>{t`products:salesCount`}</Typography>
        <Typography sx={styles.textItem}>
          {summary.sales} {t`common:pc`}.
        </Typography>
      </Box>
      <Divider />
      <Box sx={styles.wrapItem}>
        <Typography sx={styles.textItem}>{t`products:refundsCount`}</Typography>
        <Typography sx={styles.textItem}>
          {summary.returns} {t`common:pc`}.
        </Typography>
      </Box>
      <Divider />
      <Box sx={styles.wrapItem}>
        <Typography sx={styles.textItem}>{t`products:daysSale`}</Typography>
        <Typography sx={styles.textItem}>
          {summary.days_on_sale} {t`date:d`}.
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    borderRadius: "12px",
    width: {
      sm: "100%",
      md: "calc(50% - 5px)",
    },
    backgroundColor: "secondary.main",
    height: "100%",
    p: "24px 16px",
    mt: {
      xs: "10px",
      sm: "10px",
      md: "0",
    },
  },
  title: {
    fontWeight: 700,
    color: "common.black",
    fontSize: "20px",
    mb: "20px",
  },
  wrapItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: "18px 0",
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

export default memo(BrandInfo);
