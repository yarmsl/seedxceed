import {
  Box,
  LinearProgress,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

const BrandsTable = ({ isLoading, brandsData }: IBrandsTableProps) => {
  const { t } = useTranslation(["products", "date", "common"]);

  const head = useMemo(
    () =>
      Array.isArray(brandsData) && brandsData.length > 0
        ? Object.values(brandsData[0])[1]
            ?.map((b: IBrandData) => b.date)
            .reverse()
        : [],
    [brandsData]
  );

  const allCount = useMemo(
    () =>
      Array.isArray(brandsData) && brandsData.length > 0
        ? brandsData.map((brand) =>
            Object.values(brand)[1]?.map((b: IBrandData) => b.all_count)
          )
        : [],
    [brandsData]
  );

  const allPrice = useMemo(
    () =>
      Array.isArray(brandsData) && brandsData.length > 0
        ? brandsData.map((brand) =>
            Object.values(brand)[1]?.map((b: IBrandData) => b.all_price)
          )
        : [],
    [brandsData]
  );

  const rows = useMemo(() => {
    if (Array.isArray(brandsData)) {
      const res = brandsData?.map((b) => [
        b.brand,
        ...(b.graph?.map((g) => g.all_count) || []).reverse(),
      ]);
      return res;
    } else {
      return [];
    }
  }, [brandsData]);

  const priceData = rows?.map((row, i) =>
    allPrice[i]?.reduce((prev: never, acc: never) => prev + acc, 0)
  );

  const maxPrice = useMemo(() => {
    return Math.max.apply(null, priceData);
  }, [priceData]);

  const fail = useMemo(
    () => priceData.every((elem) => elem === 0),
    [priceData]
  );

  return (
    <>
      {!fail && head && (
        <>
          <Box sx={styles.loading}>{isLoading && <LinearProgress />} </Box>
          <TableContainer sx={styles.root}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                pt: "16px",
                pl: "16px",
              }}
            >
              {t`products:brands`}
            </Typography>

            <Table stickyHeader>
              <TableHead sx={styles.headerTable}>
                <TableRow>
                  <TableCell
                    sx={styles.headerTable}
                  >{t`products:brand`}</TableCell>

                  {head?.map((date: string, n: number) => (
                    <TableCell sx={styles.headerTable} key={n}>
                      {date}
                    </TableCell>
                  ))}
                  <TableCell sx={styles.headerTable}>
                    {t`products:total`} {t`products:pcs`}{" "}
                  </TableCell>
                  <TableCell sx={styles.headerTable}>
                    {t`products:total`} ₽{" "}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={styles.bodyTable}>
                {rows.map((row, i) => {
                  const valuePrice = allPrice[i]?.reduce(
                    (prev: never, acc: never) => prev + acc,
                    0
                  );
                  return (
                    <TableRow key={i}>
                      {row.map((cell, n) => (
                        <TableCell id={`${i}-${n}`} key={`${i}-${n}`}>
                          {cell}
                        </TableCell>
                      ))}

                      <TableCell>
                        {allCount[i]?.reduce(
                          (prev: never, acc: never) => prev + acc,
                          0
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ maxWidth: "350px", minWidth: "200px" }}>
                          <Box
                            sx={{
                              bgcolor: "#90CAF9",
                              height: "50px",
                              whiteSpace: "nowrap",
                              paddingRight: "5px",
                              width: `${(+valuePrice * 100) / +maxPrice}%`,
                              paddingTop: "20px",
                            }}
                          >
                            {valuePrice} ₽
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    bgcolor: "common.white",
    mt: "49px",
    borderRadius: "12px",
    "& td": {
      width: "75px",
    },
  },
  headerTable: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#2196F3",
    "& th": {
      textAlign: "end",
    },
    "& th:first-of-type": {
      textAlign: "left",
    },
    "& p": {
      textAlign: "left",
      color: "common.black",
    },
    "& th:last-of-type": {
      border: "none",
      textAlign: "left",
    },
  },
  hours: {
    display: "flex",
    flexDirection: "row",
  },
  loading: {
    width: "100%",
    height: "4px",
    position: "sticky",
  },
  bodyTable: {
    "& td": {
      textAlign: "end",
      fontSize: "14px",
      fontWeight: 400,
      color: "#757575",
      width: "170px",
    },
    "& td:first-of-type": {
      textAlign: "left",
    },

    "& td:last-of-type": {
      border: "none",
      p: "0 0 0 16px",
      width: "max-content",
    },
  },
};

export default memo(BrandsTable);
