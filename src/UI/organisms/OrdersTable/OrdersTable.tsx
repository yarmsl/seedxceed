import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { OrdersTableColumns as columns } from "./OrdersTableColumns";
import OrderRow from "./OrderRow";

const OrdersTable: FC<IOrdersTableProps> = ({
  data,
  isMobile,
  handleChangePage,
  handleChangeRowsPerPage,
  livesAmount,
  page,
  rowsPerPage,
}) => {
  const { t } = useTranslation(["common", "live"]);
  return (
    <>
      <TableContainer sx={styles.root}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{t(`live:${col.label}`)}</TableCell>
              ))}
              <TableCell>{t`live:actions`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((live, i) => (
              <OrderRow
                key={`${i}-${live.marketplace}-${page}`}
                live={live}
                columns={columns}
                page={page}
                i={i}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={styles.bottom}>
        <Box sx={styles.bottomActions}></Box>
        <TablePagination
          component={Box}
          rowsPerPageOptions={[10, 25, 50]}
          sx={styles.pagi}
          count={livesAmount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={!isMobile ? t`common:rowsPerPage` : ""}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} ${t`common:of`} ${
              count !== -1 ? count : `${t`common:moreThan`} ${to}`
            }`
          }
        />
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    bgcolor: "background.default",
    borderRadius: "12px 12px 0 12px",
    maxHeight: { xs: "calc(100vh - 280px)", sm: "calc(100vh - 238px)" },
    minHeight: "124px",
    flexGrow: 1,
  },
  bottom: {
    width: "100%",
    display: "flex",
  },
  bottomActions: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  pagi: {
    bgcolor: "common.white",
    borderRadius: "0 0 12px 12px",
  },
};

export default memo(OrdersTable);
