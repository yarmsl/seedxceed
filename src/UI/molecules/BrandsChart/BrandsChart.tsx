import { memo, useCallback, useMemo } from "react";
import { currency, round10 } from "lib/helpers";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, SxProps } from "@mui/material";
import Loading from "UI/atoms/Loading/Loading";
import { useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";
import { useMedia } from "lib/useMedia";
import LineChartCustomDot from "UI/atoms/LineChartCustomDot/LineChartCustomDot";

const BrandsChart = ({ data, isLoading }: IBrandsChartProps): JSX.Element => {
  const { darkMode } = useAppSelector((st) => st.ui);
  const { t } = useTranslation("cash");
  const { isMobile } = useMedia();
  const isOnlyOnePeriod = useMemo(() => data.length === 1, [data.length]);
  const formatText = useCallback(
    (value: string) => {
      return value.includes("orders_price") ? t`ordered` : t`revenue`;
    },
    [t]
  );

  return (
    <Box sx={darkMode ? dark : light}>
      {isLoading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            height={300}
            width={500}
            stackOffset="sign"
          >
            <XAxis dataKey="date" />
            <YAxis
              hide={isMobile}
              tickFormatter={(tick) => currency(tick)}
              domain={[
                (dataMin: number) =>
                  round10(dataMin) < 0 ? round10(dataMin) : 0,
                (dataMax: number) => round10(dataMax),
              ]}
            />
            <Tooltip
              wrapperStyle={{ borderRadius: "12px", border: "none" }}
              contentStyle={darkMode ? darkTooltipStyle : lightTooltipStyle}
              formatter={(value: number, name: string) => [
                currency(value),
                formatText(name),
              ]}
            />
            <CartesianGrid stroke={darkMode ? "#29314F" : "#E3F2FD"} />
            <Legend formatter={(value: string) => formatText(value)} />
            <Bar dataKey="sales_price" fill="#2196F3" barSize={20} />
            <Line
              dataKey="orders_price"
              type="monotone"
              stroke="#1565C0"
              strokeWidth={2}
              dot={isOnlyOnePeriod ? <LineChartCustomDot /> : false}
              activeDot={isOnlyOnePeriod ? false : true}
            />
            <ReferenceLine isFront y={0} strokeWidth={2} stroke="#b0b0b0" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    backgroundColor: "common.white",
    height: "340px",
    width: "100%",
    mt: "10px",
    borderRadius: "12px",
    p: "12px",
    fontSize: "12px",
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

const dark = { ...styles.wrap, ...styles.dark };
const light = { ...styles.wrap, ...styles.light };

const darkTooltipStyle = {
  backgroundColor: "#111936",
  border: "none",
};

const lightTooltipStyle = {
  backgroundColor: "#fff",
  border: "none",
};

export default memo(BrandsChart);
