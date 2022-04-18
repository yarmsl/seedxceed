import { Button, CircularProgress, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store";
import { setLivesCount, useGetLiveQuery } from "store/Live";
import HelmetTitle from "../../UI/atoms/Helmet";
import LiveItem from "UI/atoms/LiveItem/LiveItem";
import { memo, useCallback, useMemo } from "react";
import Loading from "UI/atoms/Loading/Loading";

const TimelinePage = () => {
  const dispatch = useAppDispatch();
  const { mpSelector } = useAppSelector((st) => st.ui);
  const { livesCount } = useAppSelector((st) => st.live);
  const loadMore = useCallback(
    () => dispatch(setLivesCount(livesCount + 30)),
    [dispatch, livesCount]
  );
  const skip = useMemo(() => mpSelector.length === 0, [mpSelector.length]);

  const { data, isFetching } = useGetLiveQuery(
    {
      mp: mpSelector,
      type: ["orders", "sales", "returns", "cancellation"],
      count: livesCount,
    },
    { pollingInterval: 30 * 60 * 1000, skip }
  );

  const lives = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const timeline = useMemo(() => {
    const filteredByType = (
      data: IGetLiveResTransformed[],
      type: LiveNotifTypes
    ) => {
      const typedData = data.filter((d) => d.type === type);
      const dates = Array.from(
        new Set(
          [...typedData]
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((d) => d.date)
        )
      );
      return dates.map((date) => ({
        data: typedData.filter((l) => l.date === date),
        type,
      }));
    };

    const orders = filteredByType(lives, "orders");
    const sales = filteredByType(lives, "sales");
    const returns = filteredByType(lives, "returns");
    const calcels = filteredByType(lives, "cancellation");

    return [...orders, ...sales, ...returns, ...calcels].sort(
      (a, b) =>
        new Date(b.data[0].date).getTime() - new Date(a.data[0].date).getTime()
    );
  }, [lives]);

  const isEmpty = useMemo(() => timeline.length === 0, [timeline.length]);

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
          "&>*:not(:last-of-type)": {
            mb: "12px",
          },
        }}
      >
        {isFetching && <Loading />}
        {timeline.map((live, i) => (
          <LiveItem key={`live-${i}`} {...live} />
        ))}
        {!isEmpty && (
          <Button
            sx={{ mt: "12px" }}
            variant="contained"
            onClick={loadMore}
            startIcon={
              isFetching && <CircularProgress size={20} color="inherit" />
            }
          >
            Загрузить еще
          </Button>
        )}
      </Paper>
    </>
  );
};

export default memo(TimelinePage);
