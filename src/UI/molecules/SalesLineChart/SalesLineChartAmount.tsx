import { Box, SxProps, Typography } from "@mui/material";
import { currency, round10 } from "lib/helpers";
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

const lines: ILineSaleAmount[] = [
  { datakey: "refunds", color: "#69f0ae" },
  { datakey: "orders", color: "#1565c0" },
  { datakey: "sales", color: "#ffc107" },
  { datakey: "profit", color: "#b39ddb" },
];

const SalesLineChartAmount = ({
  data,
  isLoading,
}: ISalesLineChartAmountProps) => {
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
          <Typography gutterBottom>{`${t`dia`} ${t`revenue`}`}</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={300} data={data}>
              <CartesianGrid stroke={darkMode ? "#29314F" : "#E3F2FD"} />
              <XAxis dataKey="date" />
              <YAxis
                hide={isMobile}
                tickFormatter={(tick) => currency(tick)}
                domain={[
                  (dataMin: number) => round10(dataMin),
                  (dataMax: number) => round10(dataMax),
                ]}
              />
              <Tooltip
                wrapperStyle={{ borderRadius: "12px", border: "none" }}
                contentStyle={darkMode ? darkTooltipStyle : lightTooltipStyle}
                formatter={(val: number, name: string) => [
                  currency(val),
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
                  stackId="amount"
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

export default memo(SalesLineChartAmount);
