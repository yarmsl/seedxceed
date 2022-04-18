import { Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";

const hours: ITableWeekColunms[] = (
  Array(24)
    .fill(1)
    .map((_, i) => i) as unknown as (keyof IHoursDataTransformed)[]
).map((n) => ({
  id: n,
  title: `${n}`,
  format: (value, maxSum) => (
    <Box
      sx={{
        ...styles.boxStyle,
        bgcolor: `rgba(21, 101, 192, ${+value / +maxSum})`,
      }}
    >
      <Box sx={styles.circle}>
        <Typography>{value === 0 ? " " : value}</Typography>
      </Box>
    </Box>
  ),
}));

export const WeekColumns: ITableWeekColunms[] = [
  {
    id: "day",
    title: "",
    format: (value) => (
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#757575",
          width: "max-content",
        }}
      >
        {value === "mon"
          ? "Пн"
          : value === "tue"
          ? "Вт"
          : value === "wed"
          ? "Ср"
          : value === "thu"
          ? "Чт"
          : value === "fri"
          ? "Пт"
          : value === "sat"
          ? "Сб"
          : value === "sun"
          ? "Вс"
          : value}
      </Typography>
    ),
  },
  ...hours,
  {
    id: "sum_count",
    title: " ",
    format: (value, maxSum) => (
      <Box
        sx={{
          height: "37px",
          bgcolor: "#90CAF9",
          whiteSpace: "nowrap",
          paddingTop: "10px",
          paddingRight: "5px",

          width: `${(+value * 100) / +maxSum}%`,
        }}
      >{`${value} шт `}</Box>
    ),
  },
];

const styles: Record<string, SxProps> = {
  circle: {
    display: "flex",
    height: "25px",
    width: "25px",
    backgroundColor: "common.white",
    borderRadius: "100px",
    alignItems: "center",
    justifyContent: "center",
  },
  boxStyle: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "36px",
  },
  none: {
    bgcolor: "common.white",
    height: "36px",
    width: "36px",
  },
};
