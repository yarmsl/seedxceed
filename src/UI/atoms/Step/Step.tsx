import { memo } from "react";
import { Box, SxProps, Typography } from "@mui/material";

const Step = ({ number, children }: IStepProps) => {
  return (
    <Box sx={styles.wrapStep}>
      <Box sx={styles.number}>
        <Typography sx={styles.numberText}>0{number}</Typography>
      </Box>
      <Typography sx={styles.textStep}>{children}</Typography>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrapStep: {
    m: "5px 0",
    p: "8px",
    border: "1px solid #f5f5f5",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "common.white",
  },
  number: {
    backgroundColor: "#E3F2FD",
    borderRadius: "50%",
    mr: "8px",
    height: "32px",
    width: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: "#2196F3",
    fontSize: "14px",
    fontWeight: 500,
  },
  textStep: {
    color: "common.black",
    fontSize: "14px",
    width: "calc(100% - 40px)",
  },
};

export default memo(Step);
