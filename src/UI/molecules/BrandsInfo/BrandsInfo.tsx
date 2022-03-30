import {memo} from 'react';
import {Box, SxProps} from "@mui/material"
import TopSales from "../TopSales/TopSales"
import BrandInfo from "../../atoms/BrandInfo/BrandInfo"

const BrandsInfo = ({topSales, summary}: IBrandsInfoProps): JSX.Element => {
  return (
    <Box sx={styles.wrap}>
      <TopSales data={topSales}/>
      <BrandInfo summary={summary}/>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "row"
    },
    mt: "10px"
  }
}

export default memo(BrandsInfo);