import {memo, useMemo, Fragment} from 'react';
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
} from "@mui/material"
import Loading from "../../atoms/Loading/Loading";
import { currency } from "lib/helpers";

const SalesTable = ({amount, count, isLoading}: ISalesTableProps): JSX.Element => {

  const data = useMemo(() => {
    return amount.map((item, idx) => {
      return {
        date: item.date,
        salesAmount: item.sales,
        ordersAmount: item.orders,
        salesCount: count[idx].sales,
        ordersCount: count[idx].orders
      }
    })
  }, [amount, count])

  return (
    <Box sx={styles.wrap}>
      {
        isLoading ?
          <Loading/>
        :
          <>
            <TableContainer>
              <Table stickyHeader>
                <TableHead sx={styles.tableHead}>
                  <TableRow>
                    <TableCell>
                      <Typography>Дата</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Выкупили, шт</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>К перечислению за товар, ₽</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Заказано, шт</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Сумма заказов минус комиссия, ₽</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={styles.tableBody}>
                  {
                    data.map((item, idx) => {
                      return (
                          <Fragment key={`item_${idx+1}`}>
                            <TableRow>
                              <TableCell>
                                <Typography>{item.date}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{item.salesCount}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{currency(item.salesAmount)}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{item.ordersCount}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{currency(item.ordersAmount)}</Typography>
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        )
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </>
      }
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    backgroundColor: "secondary.main",
    borderRadius: "12px",
    p: "15px"
  },
  tableHead: {
    whiteSpace: "nowrap",
    "& p": {
      fontSize: "16px",
      fontWeight: 500,
      color: "common.black"
    }
  },
  tableBody: {
    whiteSpace: "nowrap"
  }
}

export default memo(SalesTable);