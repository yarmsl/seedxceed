import { Box, SxProps } from "@mui/material";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ProductInfoItem from "./ProductInfoItem";

const firstCol: IProductInfoCol[] = [
  { title: "SKU", ad: "", key: "nm_id" },
  { title: "category", ad: "", key: "category" },
  { title: "size", ad: "", key: "tech_size" },
  { title: "barcode", ad: "", key: "barcode" },
  { title: "vendorCode", ad: "", key: "supplier_article" },
  { title: "brand", ad: "", key: "brand" },
];

const secondCol: IProductInfoCol[] = [
  { title: "price", ad: "₽", key: "price" },
  { title: "discountPrice", ad: "₽", key: "price_with_disc" },
  { title: "discount", ad: "%", key: "discount" },
  { title: "tradeMargin", ad: "₽", key: "markup" },
  { title: "profitability", ad: "₽", key: "rentability" },
  { title: "margin", ad: "%", key: "marginality" },
];

const thirdCol: IProductInfoCol[] = [
  { title: "defaultComm", ad: "%", key: "commission_percent" },
  { title: "defaultShipping", ad: "%", key: "logistics" },
  { title: "remainingWh", ad: "шт", key: "stocks" },
  { title: "residualsCost", ad: "₽", key: "stocks_price" },
  { title: "daysOn", ad: "", key: "days_on_site" },
];

const ProductInfo = ({ data }: IProductInfoProps) => {
  const { t } = useTranslation("products");
  const val = useCallback(
    (value?: string | number) =>
      value != null
        ? typeof value === "number"
          ? value === -1
            ? t`noData`
            : value.toFixed()
          : value === ""
          ? t`noData`
          : value
        : t`noData`,
    [t]
  );

  return (
    <Box sx={styles.root}>
      <Box sx={styles.wrapper}>
        {firstCol.map((item, i) => (
          <ProductInfoItem
            key={`st-${i}`}
            title={item.ad ? `${t(item.title)}, ${item.ad}` : t(item.title)}
            value={val(data?.[item.key])}
          />
        ))}
      </Box>
      <Box sx={styles.wrapper}>
        {secondCol.map((item, i) => (
          <ProductInfoItem
            key={`st-${i}`}
            title={item.ad ? `${t(item.title)}, ${item.ad}` : t(item.title)}
            value={val(data?.[item.key])}
          />
        ))}
      </Box>
      <Box sx={styles.wrapper}>
        {thirdCol.map((item, i) => (
          <ProductInfoItem
            key={`st-${i}`}
            title={item.ad ? `${t(item.title)}, ${item.ad}` : t(item.title)}
            value={val(data?.[item.key])}
          />
        ))}
      </Box>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignContent: "flex-start",
    flexWrap: { xs: "nowrap", sm: "wrap", md: "nowrap" },
    "&>*:not(:last-of-type)": {
      mr: { xs: "0px", md: "12px" },
      mb: { sm: "12px", md: "0px" },
    },
    "&>*:nth-of-type(1)": {
      mr: { xs: "0px", sm: "12px" },
    },
  },
  wrapper: {
    width: { xs: "100%", sm: "calc(50% - 6px)", md: "33.333%" },
    p: "12px",
    bgcolor: "background.default",
    borderRadius: 1,
    "&>*:not(:last-of-type)": {
      mb: "12px",
    },
  },
};

export default memo(ProductInfo);
