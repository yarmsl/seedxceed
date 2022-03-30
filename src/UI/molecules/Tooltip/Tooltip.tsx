import { memo } from "react";
import { Box, SxProps } from "@mui/material";
import Step from "../../atoms/Step/Step";

const Tooltip = ({ steps }: ITooltipProps): JSX.Element => {
  return (
    <Box sx={styles.wrapTooltip}>
      {steps.map((item, idx) => {
        return (
          <Step key={`step_${idx}`} number={idx + 1}>
            {item}
          </Step>
        );
      })}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrapTooltip: {
    backgroundColor: "common.white",
    borderRadius: "12px",
    p: "30px",
    width: "750px",
  },
};

export default memo(Tooltip);
