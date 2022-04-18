import { memo, useCallback, useMemo } from "react";
import { useAppSelector } from "store";
import { isTokensConsistMp } from "store/Dashboard";
import { useGetBrandsQuery } from "store/Sales";
import Brands from "../../UI/organisms/Brands/Brands";
import HelmetTitle from "../../UI/atoms/Helmet";

const BrandsPage = () => {
  const { calendarSelector, mpSelector, shopSelector } = useAppSelector(
    (st) => st.ui
  );
  const { d, dd } = calendarSelector;
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
      d,
      dd,
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
