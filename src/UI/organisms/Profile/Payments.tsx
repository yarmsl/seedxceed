import { memo, useEffect } from "react";
import {
  Table,
  Typography,
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  SxProps,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getPaymentsUser } from "../../../store/User/User.actions";
import { useAppSelector } from "../../../store";

const Payments = () => {
  const { t } = useTranslation("cash");
  const dispatch = useDispatch();
  const payments = useAppSelector((state) => state.user.payments);

  const formatDate = (date: string) => {
    const formateDate = date.substr(0, 10).split("-");
    return `${formateDate[2]}.${formateDate[1]}.${formateDate[0]}`;
  };

  useEffect(() => {
    dispatch(getPaymentsUser());
  }, [dispatch]);

  return (
    <>
      <Typography sx={styles.title}>{t`paymentStory`}</Typography>
      {payments.length ? (
        <TableContainer component={Paper}>
          <Table sx={styles.tableWrap}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "10%" }}>
                  <Typography sx={styles.headTitle}>{t`orderNum`}</Typography>
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  <Typography sx={styles.headTitle}>{t`date`}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={styles.headTitle}>{t`appoint`}</Typography>
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                  <Typography sx={styles.headTitle}>{t`price`}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((item, idx) => {
                return (
                  <TableRow key={`row_${idx + 1}`}>
                    <TableCell>
                      <Typography sx={styles.textTable}>{item.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={styles.textTable}>
                        {formatDate(item.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={styles.textTable}>
                        {t(item.title)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={styles.textTable}>
                        {item.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>{t`noPay`}</Typography>
      )}
    </>
  );
};

const styles: Record<string, SxProps> = {
  title: {
    color: "text.secondary",
    fontWeight: 500,
  },
  headTitle: {
    color: "#9e9e9e",
    fontWeight: 500,
    fontSize: "12px",
  },
  textTable: {
    color: "common.black",
    fontWeight: 500,
    fontSize: "14px",
  },
};

export default memo(Payments);
