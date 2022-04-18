import { Paper } from "@mui/material";
import { memo, useMemo } from "react";
import { useAppSelector } from "store";
import { useGetLiveQuery } from "store/Live";
import Loading from "UI/atoms/Loading/Loading";
import OrdersTableConnected from "UI/organisms/OrdersTable/OrdersTableConnected";
import HelmetTitle from "../../UI/atoms/Helmet";

const OrdersPage = () => {
  const { mpSelector } = useAppSelector((st) => st.ui);

  const skip = useMemo(() => mpSelector.length === 0, [mpSelector.length]);

  const { data, isFetching } = useGetLiveQuery(
    {
      mp: mpSelector,
      type: ["orders"],
      count: 100,
    },
    { pollingInterval: 30 * 60 * 1000, skip }
  );

  const lives = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return (
    <>
      <HelmetTitle title="timeline" />
      <Paper
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isFetching ? <Loading /> : <OrdersTableConnected lives={lives} />}
      </Paper>
    </>
  );
};

export default memo(OrdersPage);
