import { Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";

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
  {
    id: 0,
    title: "0",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 1,
    title: "1",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 2,
    title: "2",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 3,
    title: "3",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 4,
    title: "4",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 5,
    title: "5",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 6,
    title: "6",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 7,
    title: "7",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 8,
    title: "8",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 9,
    title: "9",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 10,
    title: "10",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 11,
    title: "11",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 12,
    title: "12",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 13,
    title: "13",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 14,
    title: "14",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 15,
    title: "15",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 16,
    title: "16",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 17,
    title: "17",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 18,
    title: "18",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 19,
    title: "19",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 20,
    title: "20",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 21,
    title: "21",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 22,
    title: "22",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 23,
    title: "23",
    format: (value) => (
      <Box
        sx={
          value === 0
            ? styles.none
            : value >= 26 && value <= 30
            ? styles.boxStyle2
            : value >= 15 && value <= 25
            ? styles.boxStyle3
            : value >= 6 && value <= 14
            ? styles.boxStyle4
            : value >= 1 && value <= 5
            ? styles.boxStyle5
            : styles.boxStyle
        }
      >
        <Box sx={styles.circle}>
          <Typography>{value === 0 ? " " : value}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: "sum_count",
    title: " ",
    format: (value, maxSum) => (
      <Box
        sx={{
          height: "37px",
          bgcolor: "#90CAF9",
          color: "common.white",
          minWidth: "40px",
          paddingTop: "10px",

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
    bgcolor: "#1565C0",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "36px",
    width: "56px",
  },
  boxStyle2: {
    bgcolor: "#1E88E5",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "36px",
    width: "56px",
  },
  boxStyle3: {
    bgcolor: "#2196F3",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "36px",
    width: "56px",
  },
  boxStyle4: {
    bgcolor: "#90CAF9",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "36px",
    width: "56px",
  },
  boxStyle5: {
    bgcolor: "#E3F2FD",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "36px",
    width: "56px",
  },
  none: {
    bgcolor: "common.white",
    height: "36px",
    width: "36px",
  },
};
