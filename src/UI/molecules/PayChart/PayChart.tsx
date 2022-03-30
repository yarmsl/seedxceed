import { Box, SxProps, Typography } from "@mui/material";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { currency, round10 } from "lib/helpers";
import { useMedia } from "lib/useMedia";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
import { useAppSelector } from "store";
import {
  dashboardGraphDataSelector,
  selectedMpsTotalRevenueSelector,
} from "store/Dashboard";
import { selectedLabeledMpsSelector } from "store/UI";
import LineChartCustomDot from "UI/atoms/LineChartCustomDot/LineChartCustomDot";
import Loading from "UI/atoms/Loading/Loading";

const PayChart = ({ isLoading }: IPayChartProps) => {
  const { darkMode } = useAppSelector((st) => st.ui);
  const { isMobile } = useMedia();
  const { t } = useTranslation("cash");
  const mps = useAppSelector(selectedLabeledMpsSelector);
  const data = useAppSelector(dashboardGraphDataSelector);
  const total = useAppSelector(selectedMpsTotalRevenueSelector);
  const isOnlyOnePeriod = useMemo(() => data.length === 1, [data.length]);

  const tooltipLabel = useCallback(
    (label: string) => {
      const mp = marketPlaceConf.reduce(
        (accu: string, curr) =>
          label.indexOf(`${curr.mp}_`) !== -1 ? curr.title : accu,
        ""
      );
      const explain =
        label.indexOf("_for_pay") !== -1 ? t`toTransfer` : t`ordered`;
      return `${mp}, ${explain}`;
    },
    [t]
  );
  return (
    <Box sx={darkMode ? dark : light}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Typography gutterBottom>
            {t`revenue`}: <b>{currency(total)}</b>
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={300}
              data={data}
              stackOffset="sign"
            >
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
                  tooltipLabel(name),
                ]}
              />
              <Legend
                formatter={(value) => {
                  return tooltipLabel(value);
                }}
              />

              {mps.map((mp) => (
                <Bar
                  key={`${mp.mp}_for_pay`}
                  dataKey={`${mp.mp}_for_pay`}
                  fill={mp.color2}
                  stackId="stack"
                  isAnimationActive={false}
                  animationDuration={0}
                  barSize={36}
                />
              ))}
              {mps.map((mp) => (
                <Line
                  key={`${mp.mp}_orders_price`}
                  type="monotone"
                  dataKey={`${mp.mp}_orders_price`}
                  stroke={mp.color}
                  strokeWidth={2}
                  isAnimationActive={false}
                  animationDuration={0}
                  dot={isOnlyOnePeriod ? <LineChartCustomDot /> : false}
                  activeDot={false}
                  connectNulls
                />
              ))}
              <ReferenceLine isFront y={0} strokeWidth={2} stroke="#b0b0b0" />
            </ComposedChart>
          </ResponsiveContainer>
        </>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    height: { xs: "340px", sm: "550px" },
    width: { xs: "100%", md: "calc(100% - 412px)" },
    display: "flex",
    flexDirection: "column",
    p: "12px",
    bgcolor: "common.white",
    borderRadius: 1,
    boxShadow: 23,
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

export default memo(PayChart);
