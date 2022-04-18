import { memo, useState } from "react";
import {
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const GeographyTable = ({ data }: IGeographyTableProps): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { t } = useTranslation(["common", "products"]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+(event.target as HTMLInputElement).value);
    setPage(0);
  };

  return (
    <TableContainer sx={{ mt: "24px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <Typography
                variant={"h3"}
                sx={styles.titleTable}
              >{t`products:region`}</Typography>
            </TableCell>
            <TableCell align="left" colSpan={3}>
              <Typography
                variant={"h3"}
                sx={styles.titleTable}
              >{t`products:ordersCount`}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell
              align={"center"}
              sx={{ color: "common.black" }}
            >{t`products:pcs`}</TableCell>
            <TableCell
              align={"center"}
              sx={{ color: "common.black" }}
            >{`% ${t`products:ofTotal`}`}</TableCell>
            <TableCell
              align={"center"}
              sx={{ color: "common.black" }}
            >{t`products:revenue`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    {row.name.length > 16 ? (
                      <Tooltip title={row.name}>
                        <Typography sx={{ color: "common.black" }}>
                          {row.name?.slice(0, 16) ?? ""}...
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography sx={{ color: "common.black" }}>
                        {row.name}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ color: "common.black" }}>
                      {row.value}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ color: "common.black" }}>
                      {row.percent.toFixed()}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ color: "common.black" }}>
                      {row.sum_price}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage={t`common:rowsPerPage`}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

const styles: Record<string, SxProps> = {
  titleTable: {
    color: "common.black",
    fontSize: "20px",
    fontWeight: 700,
  },
};

export default memo(GeographyTable);
