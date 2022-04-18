import {
  Box,
  FormControlLabel,
  InputAdornment,
  LinearProgress,
  Switch,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { ProductsTableColumns as columns } from "./ProductsTableColumns";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ErrorPage from "UI/atoms/ServicePages/ErrorPage";
import { useMedia } from "lib/useMedia";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store";

const ProductsTable = ({
  products,
  handleSort,
  order,
  orderBy,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  toggleDeleted,
  productsCount,
  isLoading,
  isDeleted,
  search,
  handleSearch,
  mp,
}: IProductsTableProps) => {
  const { t } = useTranslation(["common", "products"]);
  const { isMobile, isPortable } = useMedia();
  const { darkMode } = useAppSelector((st) => st.ui);
  const nav = useNavigate();
  const sticky = useCallback(
    (
      x: number,
      first: SxProps,
      second: SxProps,
      third: SxProps,
      common: SxProps | undefined = undefined
    ) =>
      !isPortable
        ? x === 0
          ? first
          : x === 1
          ? second
          : x === 2
          ? third
          : common
        : common,
    [isPortable]
  );
  return (
    <>
      <Box sx={styles.topActions}>
        <TextField
          size={!isMobile ? "small" : "medium"}
          variant="standard"
          value={search}
          onChange={handleSearch}
          autoComplete="off"
          placeholder={t`products:search`}
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ pl: "6px" }} position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          sx={{ alignSelf: "flex-end" }}
          control={<Switch checked={isDeleted} onChange={toggleDeleted} />}
          label={`${t`products:removedCards`}`}
          labelPlacement={isMobile ? "start" : "end"}
        />
      </Box>
      <TableContainer sx={styles.root}>
        <Box sx={styles.loading}>{isLoading && <LinearProgress />}</Box>
        {productsCount > 0 ? (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns?.map((col, i) => (
                  <TableCell
                    sx={sticky(i, first, second, third, styles.head)}
                    key={col.id}
                  >
                    {col.sort ? (
                      <TableSortLabel
                        active={orderBy === col.id}
                        direction={orderBy === col.id ? order : "desc"}
                        onClick={() => handleSort(col.id)}
                      >
                        {t(`products:${col.label}`)}
                      </TableSortLabel>
                    ) : (
                      t(`products:${col.label}`)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, i) => (
                <TableRow
                  onClick={() =>
                    nav(`/product/${product.nm_id}/${product.user_id}/${mp}`)
                  }
                  sx={darkMode ? styles.rowdark : styles.rowlight}
                  key={`row-${i}-${page}-${search}-${mp}-${order}-${orderBy}-${productsCount}`}
                >
                  {columns.map((col, n) => {
                    const value = product[col.id];
                    return (
                      <TableCell
                        sx={sticky(
                          n,
                          firstCell,
                          secondCell,
                          thirdCell,
                          styles.cell
                        )}
                        padding="checkbox"
                        key={`product-${i}-${n}-${page}`}
                      >
                        {col.format ? col.format(value, search) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <ErrorPage
            title={isLoading ? t`products:loadGoogs` : t`products:noGoods`}
          />
        )}
      </TableContainer>
      <Box sx={styles.bottom}>
        <Box sx={styles.bottomActions}></Box>
        <TablePagination
          component={Box}
          rowsPerPageOptions={[10, 25, 50]}
          sx={styles.pagi}
          count={productsCount}
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
    bgcolor: "common.white",
    borderRadius: "12px 12px 0 0",
    maxHeight: { xs: "calc(100vh - 280px)", sm: "calc(100vh - 238px)" },
    flexGrow: 1,
    "& .MuiSwitch-thumb": {
      boxShadow: 3,
    },
  },
  head: {
    padding: "14px 8px",
    whiteSpace: "nowrap",
    color: "text.secondary",
    bgcolor: "common.white",
  },
  loading: {
    width: "100%",
    height: "4px",
    position: "sticky",
  },
  topActions: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
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
  stickyPhoto: {
    position: "sticky",
    left: 0,
    zIndex: 3,
  },
  stickyName: {
    position: "sticky",
    left: "76px",
    zIndex: 3,
  },
  stickySku: {
    position: "sticky",
    left: "252px",
    zIndex: 3,
  },
  cell: {
    bgcolor: "inherit",
  },
  rowlight: {
    bgcolor: "background.default",
    transition: "background-color 200ms ease-in-out",
    "&:hover": {
      bgcolor: "grey.200",
      transition: "background-color 200ms ease-in-out",
      cursor: "pointer",
    },
  },
  rowdark: {
    bgcolor: "background.default",
    transition: "background-color 200ms ease-in-out",
    "&:hover": {
      bgcolor: "background.paper",
      transition: "background-color 200ms ease-in-out",
      cursor: "pointer",
    },
  },
};

const first = { ...styles.head, ...styles.stickyPhoto };
const second = { ...styles.head, ...styles.stickyName };
const third = { ...styles.head, ...styles.stickySku };

const firstCell = { ...styles.cell, ...styles.stickyPhoto };
const secondCell = { ...styles.cell, ...styles.stickyName };
const thirdCell = { ...styles.cell, ...styles.stickySku };

export default memo(ProductsTable);
