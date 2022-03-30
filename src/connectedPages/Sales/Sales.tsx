import { Box } from "@mui/material";
import { IS_DEV } from "configuration/baseUrls";
import { ddCrutch } from "lib/helpers";
import { memo, useCallback, useMemo } from "react";
import { useAppSelector } from "store";
import { isTokensConsistMp } from "store/Dashboard";
import { useGetSalesQuery } from "store/Sales";
import SalesCardsConnected from "UI/molecules/SalesCardsConnected/SalesCardsConnected";
import SalesLineChartAmount from "UI/molecules/SalesLineChart/SalesLineChartAmount";
import SalesLineChartCount from "UI/molecules/SalesLineChart/SalesLineChartCount";
import SalesTable from "UI/molecules/SalesTable/SalesTable";
import HelmetTitle from "../../UI/atoms/Helmet";

const SalesPage = () => {
  const { calendarSelector, mpSelector, shopSelector, timeStampSelector } =
    useAppSelector((st) => st.ui);
  const isTokensOfMp = useAppSelector(isTokensConsistMp);
  const isConsistense = useCallback(
    (mp: supportedMarketTypes, tokens: string[]) => isTokensOfMp(mp, tokens),
    [isTokensOfMp]
  );
  const skip = useMemo(
    () =>
      mpSelector.length === 0 ||
      shopSelector.length === 0 ||
      !isConsistense(mpSelector[0], shopSelector),
    [isConsistense, mpSelector, shopSelector]
  );

  const { data, isFetching } = useGetSalesQuery(
    {
      d: IS_DEV ? calendarSelector.d : timeStampSelector,
      dd: IS_DEV ? calendarSelector.dd : ddCrutch(timeStampSelector),
      m: mpSelector[0],
      user_id: shopSelector,
    },
    { skip }
  );

  const {
    data: salesData,
    graphAmount,
    graphCount,
  } = useMemo(
    () =>
      data != null &&
      data.data != null &&
      data.graphAmount != null &&
      data.graphCount != null
        ? data
        : { data: [], graphAmount: [], graphCount: [] },
    [data]
  );

  return (
    <>
      <HelmetTitle title="sales" />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          "&>*:not(:last-of-type)": {
            mb: "12px",
          },
        }}
      >
        <SalesCardsConnected data={salesData} isLoading={isFetching} />
        <SalesLineChartAmount data={graphAmount} isLoading={isFetching} />
        <SalesLineChartCount data={graphCount} isLoading={isFetching} />
        <SalesTable
          count={graphCount}
          amount={graphAmount}
          isLoading={isFetching}
        />
      </Box>
    </>
  );
};

export default memo(SalesPage);
