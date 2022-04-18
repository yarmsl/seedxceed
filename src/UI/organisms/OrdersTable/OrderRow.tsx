import { IconButton, SxProps, TableCell, TableRow } from "@mui/material";
import { FC, memo, useCallback, useMemo, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OrderActionMenu from "./OrderActionMenu";
import { useGetBarcodeMutation } from "store/Live";
import { useAppDispatch } from "store";
import { showErrorSnackbar } from "store/Notifications";
import { useNavigate } from "react-router-dom";

const OrderRow: FC<IOrderRowProps> = ({ live, columns, page, i }) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchor(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => setAnchor(null), []);

  const [getBarcodeMutation, { isLoading }] = useGetBarcodeMutation();

  const getBarcode = useCallback(async () => {
    try {
      const res = await getBarcodeMutation({
        income_id: live.income_id,
        marketplace: live.marketplace,
        user_id: live.user_id,
      });
      if (
        "error" in res &&
        "data" in res.error &&
        "message" in (res.error.data as errorBackEnd)
      ) {
        throw new Error((res.error.data as errorBackEnd).message);
      }
    } catch (e) {
      dispatch(
        showErrorSnackbar(
          e instanceof Error ? e.message : "Ошибка генерации штрихкода"
        )
      );
    }
  }, [
    dispatch,
    getBarcodeMutation,
    live.income_id,
    live.marketplace,
    live.user_id,
  ]);

  const isBarcode = useMemo(() => Boolean(live.income_id), [live.income_id]);

  return (
    <>
      <TableRow
        onClick={() =>
          nav(`/product/${live.nm_id}/${live.user_id}/${live.marketplace}`)
        }
        hover
        key={`${i}-${live.marketplace}-${page}`}
        sx={styles.root}
      >
        {columns.map((col, j) => {
          const val = live[col.id];
          return (
            <TableCell
              sx={styles.cell}
              padding="checkbox"
              key={`${i}-${j}-${col.id}-${live.marketplace}-${page}`}
            >
              {col.format ? col.format(val, live) : val}
            </TableCell>
          );
        })}
        <TableCell sx={styles.cell} padding="checkbox">
          <IconButton onClick={handleClick} color="primary">
            <MoreHorizIcon fontSize="large" />
          </IconButton>
        </TableCell>
      </TableRow>
      <OrderActionMenu
        anchor={anchor}
        handleClose={handleClose}
        getBarcode={getBarcode}
        isLoading={isLoading}
        isBarcode={isBarcode}
      />
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    cursor: "pointer",
  },
  cell: {
    pt: "12px",
  },
};

export default memo(OrderRow);
