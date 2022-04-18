import { memo } from "react";
import { Box, SxProps } from "@mui/material";
import AddComplaint from "../../molecules/AddComplaint/AddComplaint";
import ComplaintTable from "../../molecules/ComplaintTable/ComplaintTable";

const Complaints = (): JSX.Element => {
  return (
    <Box sx={styles.wrap}>
      <AddComplaint />
      <ComplaintTable />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default memo(Complaints);
