import { SxProps } from "@mui/material";
import { FC, memo, useMemo } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { Box } from "@mui/system";

const TrendChevron: FC<ITrendChevronProps> = ({ direction }) => {
  const styles = useMemo(() => stylesByDirection(direction), [direction]);
  return (
    <Box sx={styles.root}>
      <ExpandLessRoundedIcon fontSize="inherit" />
    </Box>
  );
};

const stylesByDirection = (
  direction: "rise" | "fall"
): Record<string, SxProps> => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    bgcolor: direction === "rise" ? "#B9F6CA" : "#FFAB91",
    "& svg": {
      transform: direction === "rise" ? "none" : "rotate(180deg)",
      color: direction === "rise" ? "#00C853" : "#D84315",
    },
  },
});

export default memo(TrendChevron);
