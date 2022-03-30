import { Box, SxProps, Typography } from "@mui/material";
import { round10 } from "lib/helpers";
import { useMedia } from "lib/useMedia";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { useAppSelector } from "store";
import LineChartCustomDot from "UI/atoms/LineChartCustomDot/LineChartCustomDot";
import Loading from "UI/atoms/Loading/Loading";

const lines: ILineSaleCount[] = [
  { datakey: "refunds", color: "#ffab91" },
  { datakey: "sales", color: "#4527a0" },
  { datakey: "orders", color: "#90caf9" },
];

const SalesLineChartCount = ({
  data,
  isLoading,
}: ISalesLineChartCountProps) => {
  const { darkMode } = useAppSelector((st) => st.ui);
  const { isMobile } = useMedia();
  const { t } = useTranslation("products");
  const isOnlyOnePeriod = useMemo(() => data.length === 1, [data.length]);
  return (
    <Box sx={darkMode ? dark : light}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Typography gutterBottom>{`${t`dia`} ${t`quantity`}`}</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={300} data={data}>
              <CartesianGrid stroke={darkMode ? "#29314F" : "#E3F2FD"} />
              <XAxis dataKey="date" />
              <YAxis
                hide={isMobile}
                tickFormatter={(tick) => `${tick} ${t`pcs`}`}
                domain={[
                  (dataMin: number) => round10(dataMin, true),
                  (dataMax: number) => round10(dataMax, true),
                ]}
              />
              <Tooltip
                wrapperStyle={{ borderRadius: "12px", border: "none" }}
                contentStyle={darkMode ? darkTooltipStyle : lightTooltipStyle}
                formatter={(val: number, name: string) => [
                  `${val} ${t`pcs`}`,
                  t(name),
                ]}
              />
              <Legend formatter={(value) => t(value)} />
              {lines.map(({ datakey, color }) => (
                <Area
                  dataKey={datakey}
                  key={`amount-${datakey}`}
                  type="monotone"
                  dot={isOnlyOnePeriod ? <LineChartCustomDot /> : false}
                  activeDot={isOnlyOnePeriod ? false : true}
                  strokeWidth={2}
                  stroke={color}
                  fill={color}
                  stackId="count"
                  connectNulls
                />
              ))}
              <ReferenceLine isFront y={0} stroke="#b0b0b0" />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "315px",
    display: "flex",
    flexDirection: "column",
    borderRadius: 1,
    p: "12px",
    bgcolor: "common.white",
    fontSize: "12px",
    flexGrow: 1,
    "& .recharts-default-tooltip": {
      borderRadius: "12px",
      boxShadow: 5,
    },
  },
  dark: {
    bgcolor: "background.paper",
    "& .recharts-cartesian-axis-tick-value": {
      fill: "#fff",
    },
    "& .recharts-legend-item-text": {
      color: "#fff!important",
    },
    "& .recharts-tooltip-item": {
      color: "#fff!important",
    },
  },
  light: {
    bgcolor: "background.default",
    "& .recharts-cartesian-axis-tick-value": {
      fill: "#757575",
    },
    "& .recharts-legend-item-text": {
      color: "#212121!important",
    },
    "& .recharts-tooltip-item": {
      color: "#212121!important",
    },
  },
};

const dark = { ...styles.root, ...styles.dark };
const light = { ...styles.root, ...styles.light };

const darkTooltipStyle = {
  backgroundColor: "#111936",
  border: "none",
};

const lightTooltipStyle = {
  backgroundColor: "#fff",
  border: "none",
};

export default memo(SalesLineChartCount);
