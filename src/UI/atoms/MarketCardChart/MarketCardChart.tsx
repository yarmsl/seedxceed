import { Box } from "@mui/material";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FC, memo, useMemo } from "react";
import ChartTooltip from "./ChartTooltip";

const CardChart: FC<IMarketCardChartProps> = ({
  data,
}: IMarketCardChartProps) => {
  const axiosData = useMemo(
    () =>
      data &&
      Object.keys(data).map((key) => ({
        date: key,
        op: data[key].orders_price,
      })),
    [data]
  );
  return (
    <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
      {axiosData && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={axiosData}>
            <XAxis dataKey="date" hide />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="op"
              stroke="white"
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export const MarketCardChart = memo(CardChart);
