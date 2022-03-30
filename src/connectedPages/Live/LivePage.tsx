import { Paper } from "@mui/material";
import { useAppSelector } from "store";
import { useGetLiveQuery } from "store/Live";
import HelmetTitle from "../../UI/atoms/Helmet";
import LiveItem from "UI/atoms/LiveItem/LiveItem";
import { memo, useMemo } from "react";
import Loading from "UI/atoms/Loading/Loading";

const LivePage = () => {
  const { calendarSelector, mpSelector, liveTypesSelector } = useAppSelector(
    (st) => st.ui
  );

  const skip = useMemo(
    () => mpSelector.length === 0 || liveTypesSelector.length === 0,
    [liveTypesSelector.length, mpSelector.length]
  );

  const { data, isLoading, isFetching } = useGetLiveQuery(
    {
      mp: mpSelector,
      d: calendarSelector.d,
      type: liveTypesSelector,
      count: 80,
    },
    { pollingInterval: 30 * 60 * 1000, skip }
  );

  const lives = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const isLoadingLives = useMemo(
    () => isLoading || isFetching,
    [isLoading, isFetching]
  );
  // const ws = useRef<WebSocket | null>(null)
  // ws.current = new WebSocket("wss://dev.seed-x-ceed.com:3000/ws")
  // useEffect(() => {
  //   if (ws.current != null) {
  //       ws.current.onmessage = e => console.log(JSON.parse(e.data) )
  //   }
  // }, []);

  return (
    <>
      <HelmetTitle title="Live" needNoTranslation />
      <Paper
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          p: "12px",
          display: "flex",
          flexDirection: "column",
          "&>*:not(:last-of-type)": {
            mb: "12px",
          },
        }}
      >
        {isLoadingLives ? (
          <Loading />
        ) : (
          lives.map((live, i) => <LiveItem key={`live-${i}`} {...live} />)
        )}
      </Paper>
    </>
  );
};

export default memo(LivePage);
