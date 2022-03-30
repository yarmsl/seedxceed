import { Box, SxProps, Tooltip } from "@mui/material";
import { currency } from "lib/helpers";
import { HighlightText } from "lib/HighlightText";
import Image from "../../atoms/Image/Image";

export const ProductsTableColumns: IProductsTableColumn[] = [
  {
    id: "photo",
    label: "photo",
    sort: false,
    type: "string",
    format: (value) => <Image img={`${value}`} />,
  },
  {
    id: "name",
    label: "title",
    sort: true,
    type: "string",
    format: (value, search) => {
      return (
        <Tooltip
          title={<HighlightText text={`${value}`} highlight={search} />}
          arrow
        >
          <Box sx={styles.long}>
            <HighlightText text={`${value}`} highlight={search} />
          </Box>
        </Tooltip>
      );
    },
  },
  {
    id: "nm_id",
    label: "SKU",
    sort: false,
    type: "string",
  },
  {
    id: "orders",
    label: "ordersPcs",
    type: "number",
    sort: true,
  },
  {
    id: "orders_price",
    label: "orders",
    type: "number",
    sort: true,
    format: (value) => currency(+value),
  },
  {
    id: "sales",
    label: "salesPcs",
    type: "number",
    sort: true,
  },
  {
    id: "sales_price",
    label: "revenue",
    type: "number",
    sort: true,
    format: (value) => currency(+value),
  },
  {
    id: "commission",
    label: "commPerUnit",
    sort: true,
    type: "number",
    format: (value) => currency(+value),
  },
  {
    id: "commission_percent",
    label: "commPerUnit",
    sort: true,
    type: "number",
    format: (value) => `${value}%`,
  },
  {
    id: "days_on_site",
    label: "daysOn",
    sort: true,
    type: "number",
    format: (value) => (value === -1 ? "n/d" : value),
  },
  {
    id: "brand",
    label: "brand",
    sort: true,
    type: "string",
    format: (value) => (
      <Tooltip title={`${value}`} arrow>
        <Box sx={styles.long}>{value}</Box>
      </Tooltip>
    ),
  },
  {
    id: "category",
    label: "category",
    sort: true,
    type: "string",
    format: (value) => (
      <Tooltip title={`${value}`} arrow>
        <Box sx={styles.long}>{value}</Box>
      </Tooltip>
    ),
  },
  {
    id: "supplier_article",
    label: "vendorCode",
    sort: true,
    type: "string",
    format: (value) => (
      <Tooltip title={`${value}`} arrow>
        <Box sx={styles.long}>{value}</Box>
      </Tooltip>
    ),
  },
  {
    id: "tech_size",
    label: "size",
    sort: true,
    type: "number",
  },
  {
    id: "stocks",
    label: "warehouse",
    sort: true,
    type: "number",
  },
  {
    id: "full_stocks",
    label: "ownWh",
    sort: true,
    type: "number",
  },
  {
    id: "price",
    label: "productPrice",
    sort: true,
    type: "number",
    format: (value) => currency(+value),
  },
  {
    id: "discount",
    label: "discount",
    sort: true,
    type: "number",
    format: (value) => `${value}%`,
  },
  {
    id: "price_with_disc",
    label: "discountPrice",
    sort: true,
    type: "number",
    format: (value) => currency(+value),
  },
];

const styles: Record<string, SxProps> = {
  image: {
    width: "60px",
    height: "60px",
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: 3,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  long: {
    width: "160px",
    maxWidth: "180px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
};
