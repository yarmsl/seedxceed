import { memo, useCallback, useEffect, useMemo } from "react";
import { Box, Paper, SxProps } from "@mui/material";
import {
  isAtLeastOneLinkedShop,
  resetDashboardMp,
  tokensByMPSelector,
  useGetDashboardAllQuery,
  useLazyGetDashboardQuery,
} from "../../store/Dashboard";
import Helmet from "UI/atoms/Helmet";
import MarketCardsConnected from "UI/organisms/MarketCardsConnected/MarketCardsConnected";
import { useAppDispatch, useAppSelector } from "store";
import PayChart from "UI/molecules/PayChart/PayChart";
import YouTubeBox from "UI/atoms/YouTubeBox/YouTubeBox";
import TopSales from "UI/molecules/TopSales/TopSales";
import ScannerBanner from "UI/atoms/ScannerBanner/ScannerBanner";
import SupportWindow from "UI/molecules/SupportWindow/SupportWindow";
import { LANG, IS_DEV } from "configuration/baseUrls";
import { ddCrutch } from "lib/helpers";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { timeStampSelector, calendarSelector, mpSelector, shopSelector } =
    useAppSelector((st) => st.ui);
  const { data, isLoading: isDAllLoading } = useGetDashboardAllQuery("");
  const [getDasboard, { isFetching, isLoading }] = useLazyGetDashboardQuery();
  const cardsListData = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );
  const getTokens = useAppSelector(tokensByMPSelector);
  const isDLoading = useMemo(
    () => isFetching || isLoading,
    [isFetching, isLoading]
  );
  const selectedShopsByMp = useCallback(
    (mp: supportedMarketTypes) =>
      getTokens([mp]).filter((token) => shopSelector.includes(token)),
    [getTokens, shopSelector]
  );
  const isLinkedMPs = useAppSelector(isAtLeastOneLinkedShop);

  useEffect(() => {
    if (mpSelector.length > 0 && shopSelector.length > 0) {
      mpSelector.forEach((mp) => {
        const shops = selectedShopsByMp(mp);
        if (shops.length > 0) {
          getDasboard({
            d: IS_DEV ? calendarSelector.d : timeStampSelector,
            dd: IS_DEV ? calendarSelector.dd : ddCrutch(timeStampSelector),
            user_id: shops,
            m: mp,
          });
        } else {
          dispatch(resetDashboardMp(mp));
        }
      });
    }
  }, [
    calendarSelector.d,
    calendarSelector.dd,
    dispatch,
    getDasboard,
    mpSelector,
    selectedShopsByMp,
    shopSelector,
    timeStampSelector,
  ]);

  return (
    <>
      <Helmet title="desktop" />
      <Paper sx={styles.root}>
        <MarketCardsConnected data={cardsListData} isLoading={isDAllLoading} />
        <Box sx={styles.main}>
          {isLinkedMPs ? (
            <>
              <PayChart isLoading={isDLoading} />
              <Box sx={styles.right}>
                {LANG === "ru" && <ScannerBanner />}
                <TopSales />
              </Box>
            </>
          ) : (
            <>
              <Box sx={styles.yb}>
                {LANG === "ru" && <YouTubeBox embedId="1mbDrmRgQ-o" />}
              </Box>
              <Box sx={styles.right2}>
                <SupportWindow />
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    p: "12px",
    flexGrow: 1,
    overflowX: "hidden",
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  main: {
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    "&>*:not(:last-child)": {
      mr: { xs: "0px", md: "12px" },
      mb: { xs: "12px", md: "0px" },
    },
  },
  right: {
    maxWidth: "400px",
    height: { xs: "100%", lg: "550px" },
    width: { xs: "100%", sm: "400px" },
    minWidth: { xs: "100%", sm: "400px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  right2: {
    maxWidth: "400px",
    height: { xs: "400px", lg: "550px" },
    width: { xs: "100%", sm: "400px" },
    minWidth: { xs: "100%", sm: "400px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mb: "12px",
    },
  },
  yb: {
    width: { xs: "100%", md: "calc(100% - 412px)" },
    height: { xs: "250px", sm: "360px", md: "400px", lg: "550px" },
  },
};

export default memo(DashboardPage);
