import { Box, SxProps, Typography } from "@mui/material";
import { currency, round10 } from "lib/helpers";
import { useMedia } from "lib/useMedia";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useAppSelector } from "store";
import Loading from "UI/atoms/Loading/Loading";

const lines: ILineProductChart[] = [
  { datakey: "price", color: "#4527A0" },
  { datakey: "sales", color: "#90CAF9" },
  { datakey: "discount", color: "#FFC107" },
  { datakey: "refunds", color: "#B39DDB" },
];

const ProductChart = ({ data, isLoading }: IProductChartProps) => {
  const { darkMode } = useAppSelector((st) => st.ui);
  const { isMobile } = useMedia();
  const { t } = useTranslation("products");

  const maxSum = useMemo(() => {
    const arrN = data.reduce(
      (accu: number[], curr) =>
        accu.concat(curr.price, curr.refunds, curr.sales),
      []
    );
    return round10(Math.max.apply(null, arrN), true);
  }, [data]);

  const processedData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        discount: (item.discount / 100) * maxSum,
      })),
    [data, maxSum]
  );

  const tooltipDiscount = useCallback(
    (val: number) => (maxSum !== 0 ? (val / maxSum) * 100 : 0).toFixed(0),
    [maxSum]
  );

  return (
    <Box sx={darkMode ? dark : light}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Typography gutterBottom>{t`salesDynamics`}</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={processedData}>
              <CartesianGrid stroke={darkMode ? "#221f24" : "#f5f5f5"} />
              <XAxis dataKey="date" />
              <YAxis
                hide={isMobile}
                tickFormatter={(tick) => currency(tick)}
                domain={[
                  (dataMin: number) => round10(dataMin, true),
                  (dataMax: number) => round10(dataMax, true),
                ]}
              />
              <Tooltip
                wrapperStyle={{ borderRadius: "12px", border: "none" }}
                contentStyle={darkMode ? darkTooltipStyle : lightTooltipStyle}
                formatter={(val: number, name: string) => [
                  name === "discount"
                    ? `${tooltipDiscount(val)} %`
                    : currency(val),
                  t(name),
                ]}
              />
              <Legend formatter={(value) => t(value)} />
              {lines.map(({ datakey, color }) => (
                <Line
                  dataKey={datakey}
                  key={`amount-${datakey}`}
                  type="monotone"
                  dot={false}
                  strokeWidth={2}
                  strokeDasharray={datakey === "discount" ? "5 5" : undefined}
                  stroke={color}
                  connectNulls
                />
              ))}
              <ReferenceLine isFront y={0} stroke="#b0b0b0" />
            </LineChart>
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

export default memo(ProductChart);
