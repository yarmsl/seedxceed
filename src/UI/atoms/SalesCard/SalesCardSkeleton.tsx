import { Skeleton, SxProps } from "@mui/material";
import { memo } from "react";

const SalesCardSkeleton = (): JSX.Element => {
  return <Skeleton variant="rectangular" sx={styles.root}></Skeleton>;
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "100%",
    borderRadius: 1,
  },
};

export default memo(SalesCardSkeleton);
