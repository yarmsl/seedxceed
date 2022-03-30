import { Skeleton, SxProps } from "@mui/material";

const SkeletonMarketCard = (): JSX.Element => {
  return <Skeleton variant="rectangular" sx={styles.root}></Skeleton>;
};

const styles: Record<string, SxProps> = {
  root: {
    minWidth: "262px",
    width: "100%",
    height: { xs: "200px", sm: "100%" },
    mb: { xs: "12px", sm: "0px" },
    borderRadius: 1,
  },
};

export default SkeletonMarketCard;
