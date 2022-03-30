import { memo, useCallback, useMemo } from "react";
import { useAppSelector } from "store";
import { isTokensConsistMp } from "store/Dashboard";
import { useGetBrandsQuery } from "store/Sales";
import Brands from "../../UI/organisms/Brands/Brands";
import HelmetTitle from "../../UI/atoms/Helmet";
import { IS_DEV } from "configuration/baseUrls";
import { ddCrutch } from "lib/helpers";

const BrandsPage = () => {
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

  const { data, isFetching } = useGetBrandsQuery(
    {
      d: IS_DEV ? calendarSelector.d : timeStampSelector,
      dd: IS_DEV ? calendarSelector.dd : ddCrutch(timeStampSelector),
      m: mpSelector[0],
      user_id: shopSelector,
    },
    { skip }
  );

  return (
    <>
      <HelmetTitle title="brands" />
      <Brands brands={data} isFetching={isFetching} />
    </>
  );
};

export default memo(BrandsPage);
