import { Box, Divider, Typography } from "@mui/material";
import { currency, date } from "lib/helpers";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const ChartTooltip = ({ active, payload, label }: IChartTooltipProps) => {
  const { t } = useTranslation("cash");

  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          zIndex: 25,
          borderRadius: "15px",
          bgcolor: "background.default",
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          fontSize: "3rem",
          fontWeight: "bold",
        }}
        className="custom-tooltip"
      >
        <Typography sx={{ p: "3px 5px 0" }} component="p">
          {date(label || "")}
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <Typography
          sx={{ p: "0 5px 3px" }}
          component="p"
        >{`${t`revenue`}: ${currency(payload[0].payload.op)}`}</Typography>
      </Box>
    );
  }

  return null;
};

export default memo(ChartTooltip);
