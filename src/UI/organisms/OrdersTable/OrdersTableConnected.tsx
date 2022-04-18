import { useMedia } from "lib/useMedia";
import { FC, memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { setOrdersPage, setOrdersRows } from "store/Live";
import OrdersTable from "./OrdersTable";

const OrdersTableConnected: FC<IOrdersTableConnectedProps> = ({ lives }) => {
  const dispatch = useAppDispatch();
  const { isMobile } = useMedia();
  const { ordersPage, ordersRows } = useAppSelector((st) => st.live);

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => dispatch(setOrdersPage(newPage)),
    [dispatch]
  );

  const handleChangeRowsPerPage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setOrdersRows(parseInt(e.target.value, 10)));
      setOrdersRows(0);
    },
    [dispatch]
  );

  const livesAmount = useMemo(() => lives.length, [lives.length]);

  const paginatedLives = useMemo(
    () =>
      lives.slice(
        ordersRows * (ordersPage + 1) - ordersRows,
        ordersRows * (ordersPage + 1)
      ),
    [lives, ordersPage, ordersRows]
  );

  return (
    <OrdersTable
      data={paginatedLives}
      isMobile={isMobile}
      page={ordersPage}
      rowsPerPage={ordersRows}
      livesAmount={livesAmount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default memo(OrdersTableConnected);
