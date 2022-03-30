import { Box, SxProps, Typography } from "@mui/material";
import { memo } from "react";

const ProductInfoItem = ({ title, value }: IProductInfoItemProps) => {
  return (
    <Box sx={styles.root}>
      <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "14px" }} color="text.secondary">
        {value}
      </Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    display: "flex",
    height: "68px",
    flexDirection: "column",
    borderColor: "secondary.light",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: 1,
    p: "12px",
  },
};

export default memo(ProductInfoItem);
