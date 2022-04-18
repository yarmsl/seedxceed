import {
  memo,
  useMemo,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import {
  Box,
  SxProps,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { isSameWeek, differenceInCalendarWeeks } from "date-fns";
import Loading from "../../atoms/Loading/Loading";
import { currency } from "lib/helpers";
import { useTranslation } from "react-i18next";

interface ISaleTable {
  item: ISaleTableItem;
  numberWeek: number;
}

interface ISaleTableItem {
  date: string;
  salesAmount: number;
  ordersAmount: number;
  salesCount: number;
  ordersCount: number;
}

const SalesTable = ({
  amount,
  count,
  isLoading,
}: ISalesTableProps): JSX.Element => {
  const [showWeek, setShowWeek] = useState<boolean[]>([]);
  const { t } = useTranslation(["cash", "common", "newCard"]);

  const sales = useMemo(() => {
    return amount.map((item, idx) => {
      return {
        date: item.date,
        salesAmount: item.sales,
        ordersAmount: item.orders,
        salesCount: count[idx].sales,
        ordersCount: count[idx].orders,
      };
    });
  }, [amount, count]);

  const numberOfWeek = (date: Date) => {
    const firstDateOfYear = new Date(date.getFullYear(), 0, 1);
    return (
      differenceInCalendarWeeks(date, firstDateOfYear, {
        weekStartsOn: 1,
      }) + 1
    );
  };

  const createWeek = useCallback(
    (first: Date) => {
      const weeks: ISaleTable[][] = [[]];
      let currentWeek = 0;
      let prevDate = first;

      sales.forEach((item: ISaleTableItem) => {
        const currentDateTransform = item?.date.split(".");
        const currentDate = new Date(
          parseInt(currentDateTransform[2]),
          parseInt(currentDateTransform[1]) - 1,
          parseInt(currentDateTransform[0])
        );
        const numberWeek = numberOfWeek(currentDate);
        if (isSameWeek(currentDate, prevDate, { weekStartsOn: 1 })) {
          weeks[currentWeek].push({ item, numberWeek });
          prevDate = currentDate;
        } else {
          currentWeek++;
          weeks.push([{ item, numberWeek }]);
          prevDate = currentDate;
        }
      });

      return weeks;
    },
    [sales]
  );

  const openWeek = (idx: number) => {
    const newShowWeek = showWeek.map((item, i) => {
      if (i === idx) return !showWeek[idx];
      return item;
    });
    setShowWeek(newShowWeek);
  };

  const data = useMemo(() => {
    const firstDayTransform = sales[0]?.date.split(".");
    const firstDay = Array.isArray(firstDayTransform)
      ? new Date(
          parseInt(firstDayTransform[2]),
          parseInt(firstDayTransform[1]) - 1,
          parseInt(firstDayTransform[0])
        )
      : new Date(2018, 1, 1);
    return createWeek(firstDay);
  }, [sales, createWeek]);

  useEffect(() => {
    const showWeeks = data.map(() => false);
    setShowWeek(showWeeks);
  }, [data]);

  return (
    <Box sx={styles.wrap}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TableContainer>
            <Table stickyHeader>
              <TableHead sx={styles.tableHead}>
                <TableRow>
                  <TableCell>
                    <Typography>{t`cash:week`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{t`cash:date`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t`cash:salesCount`}, {t`common:pc`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t`cash:salesAmount`}, {t`newCard:currency`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t`cash:ordersCount`}, {t`common:pc`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {t`cash:ordersAmount`}, {t`newCard:currency`}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={styles.tableBody}>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography>Итог</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {data.reduce((sum, current) => {
                        return (
                          current.reduce(
                            (sum1: number, current1) =>
                              sum1 + current1.item.salesCount,
                            0
                          ) + sum
                        );
                      }, 0)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {currency(
                        data.reduce((sum, current) => {
                          return (
                            current.reduce(
                              (sum1: number, current1) =>
                                sum1 + current1.item.salesAmount,
                              0
                            ) + sum
                          );
                        }, 0)
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {data.reduce((sum, current) => {
                        return (
                          current.reduce(
                            (sum1: number, current1) =>
                              sum1 + current1.item.ordersCount,
                            0
                          ) + sum
                        );
                      }, 0)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {currency(
                        data.reduce((sum, current) => {
                          return (
                            current.reduce(
                              (sum1: number, current1) =>
                                sum1 + current1.item.ordersAmount,
                              0
                            ) + sum
                          );
                        }, 0)
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
                {data.map((item, idx) => {
                  return (
                    <Fragment key={`item_${idx + 1}`}>
                      <TableRow>
                        <TableCell
                          onClick={() => openWeek(idx)}
                          sx={styles.weekCell}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography>
                              Неделя {item[0]?.numberWeek}
                            </Typography>
                            <ExpandLessRoundedIcon
                              sx={{
                                ...styles.arrow,
                                transform: showWeek[idx]
                                  ? "rotate(180deg)"
                                  : "none",
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>Итог</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {item.reduce(
                              (sum, current) => sum + current.item.salesCount,
                              0
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {currency(
                              item.reduce(
                                (sum, current) =>
                                  sum + current.item.salesAmount,
                                0
                              )
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {item.reduce(
                              (sum, current) => sum + current.item.ordersCount,
                              0
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {currency(
                              item.reduce(
                                (sum, current) =>
                                  sum + current.item.ordersAmount,
                                0
                              )
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {item.map((sale, i) => {
                        return (
                          <Fragment key={`sale_${i + 1}`}>
                            {showWeek[idx] && (
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                  <Typography>{sale.item.date}</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>
                                    {sale.item.salesCount}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>
                                    {currency(sale.item.salesAmount)}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>
                                    {sale.item.ordersCount}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>
                                    {currency(sale.item.ordersAmount)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )}
                          </Fragment>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    backgroundColor: "secondary.main",
    borderRadius: "12px",
    p: "15px",
  },
  tableHead: {
    whiteSpace: "nowrap",
    "& p": {
      fontSize: "16px",
      fontWeight: 500,
      color: "common.black",
    },
  },
  tableBody: {
    whiteSpace: "nowrap",
  },
  weekCell: {
    cursor: "pointer",
  },
  arrow: {
    color: "#00C853",
    transition: "transform 0.3s",
  },
};

export default memo(SalesTable);
