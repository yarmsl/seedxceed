import { memo, useState, useEffect, useMemo } from "react";
import { uiSelector } from "../../../store/UI";
import { Box, SxProps, Typography } from "@mui/material";
import GeographyChart from "../../atoms/GeographyChart/GeographyChart";
import GeographyTable from "../../atoms/GeographyTable/GeographyTable";
import { useGetSalesGeographyQuery } from "../../../store/Sales/Sales.service";
import { useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";

type SaleData = Record<string, ISale>;

interface IPieChart {
  name: string;
  value: number;
  sum_price: number;
  percent: number;
}

const SalesGeography = (): JSX.Element => {
  const { calendarSelector, mpSelector, shopSelector } =
    useAppSelector(uiSelector);
  const { d, dd } = calendarSelector;
  const [orders, setOrders] = useState<IPieChart[]>([]);
  const [sales, setSales] = useState<IPieChart[]>([]);
  const [colorsOrders, setColorsOrders] = useState<string[]>([]);
  const [colorsSales, setColorsSales] = useState<string[]>([]);
  const { data } = useGetSalesGeographyQuery({
    d,
    dd,
    m: mpSelector[0],
    user_id: [shopSelector[0]],
  });
  const { t } = useTranslation(["products", "common"]);

  const colors = useMemo(
    () => [
      "#1abc9c",
      "#3498db",
      "#2ecc71",
      "#34495e",
      "#9b59b6",
      "#16a085",
      "#2980b9",
      "#27ae60",
      "#8e44ad",
      "#2c3e50",
      "#f1c40f",
      "#f39c12",
      "#c0392b",
      "#e67e22",
      "#341f97",
      "#f368e0",
      "#feca57",
      "#48dbfb",
      "#F97F51",
      "#1B9CFC",
      "#B33771",
      "#BDC581",
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  useEffect(() => {
    let orders: IPieChart[] = [];
    let sales: IPieChart[] = [];
    data?.orders.forEach((item: SaleData) => {
      orders = [
        ...orders,
        {
          name: Object.keys(item)[0],
          value: item[Object.keys(item)[0]].count,
          percent: item[Object.keys(item)[0]].percent,
          sum_price: item[Object.keys(item)[0]].sum_price,
        },
      ];
    });
    setOrders([...orders]);
    data?.sales.forEach((item: SaleData) => {
      sales = [
        ...sales,
        {
          name: Object.keys(item)[0],
          value: item[Object.keys(item)[0]].count,
          percent: item[Object.keys(item)[0]].percent,
          sum_price: item[Object.keys(item)[0]].sum_price,
        },
      ];
    });
    setSales([...sales]);

    const orderTempColors: string[] = [];
    const saleTempColors: string[] = [];

    orders = [...orders.slice(0, 11)];
    sales = [...sales.slice(0, 11)];

    orders.forEach((order, i) => {
      sales.forEach((sale, j) => {
        if (order.name === sale.name) {
          orderTempColors[i] = colors[0];
          saleTempColors[j] = colors[0];
          colors.shift();
        }
      });
    });

    orders.forEach((_, idx) => {
      if (!orderTempColors[idx]) {
        orderTempColors[idx] = colors[0];
        colors.shift();
      }
    });

    sales.forEach((_, idx) => {
      if (!saleTempColors[idx]) {
        saleTempColors[idx] = colors[0];
        colors.shift();
      }
    });

    setColorsOrders([...orderTempColors]);
    setColorsSales([...saleTempColors]);
  }, [data, colors]);

  return (
    <>
      <Box sx={styles.wrap}>
        <Box sx={styles.chart}>
          <Typography sx={styles.title}>{t`orders`}</Typography>
          {orders.length ? (
            <Box sx={{ width: "100%" }}>
              <GeographyChart data={orders} colors={colorsOrders} />
              <GeographyTable data={orders} />
            </Box>
          ) : (
            <Typography>
              {t`products:noData`} {t`products:forSelectedPeriod`}
            </Typography>
          )}
        </Box>
        <Box sx={styles.chart}>
          <Typography sx={styles.title}>{t`sales`}</Typography>
          {sales.length ? (
            <Box sx={{ width: "100%" }}>
              <GeographyChart data={sales} colors={colorsSales} />
              <GeographyTable data={sales} />
            </Box>
          ) : (
            <Typography>
              {t`products:noData`} {t`products:forSelectedPeriod`}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: {
      sm: "column",
      xs: "column",
      md: "column",
      lg: "row",
      xl: "row",
    },
  },
  chart: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "100%",
      lg: "calc(50% - 12px)",
      xl: "calc(50% - 12px)",
    },
    mb: {
      xs: "24px",
      sm: "24px",
      md: "24px",
    },
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "common.white",
    borderRadius: "12px",
    p: "16px",
    "& ul": {
      display: "flex",
      flexDirection: "column",
      fontSize: "14px",
    },
    "& .recharts-wrapper svg": {
      height: "500px",
    },
    "& .recharts-wrapper li svg": {
      height: "30px",
    },
  },
  title: {
    textAlign: "center",
    mb: "50px",
    fontSize: "28px",
    fontWeight: 700,
    color: "common.black",
  },
};

export default memo(SalesGeography);
