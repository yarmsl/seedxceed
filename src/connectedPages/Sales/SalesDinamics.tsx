import { useCallback, useMemo } from "react";
import { useAppSelector } from "store";
import { isTokensConsistMp } from "store/Dashboard";
import { useGetProductsQuery } from "store/Products";
import { useGetSalesDynamicsQuery } from "store/Sales";
import HelmetTitle from "../../UI/atoms/Helmet";
import BrandsTable from "../../UI/organisms/SalesDynamics/BrandsTable";
import TableWeek from "../../UI/organisms/SalesDynamics/TableWeek";
import AreaChartBrands from "../../UI/organisms/SalesDynamics/AreaChart";
import { IS_DEV } from "configuration/baseUrls";
import OnReconstructionPage from "UI/atoms/ServicePages/OnReconstructionPage";

export const SalesDynamicsPage = () => {
  const { calendarSelector, mpSelector, shopSelector } = useAppSelector(
    (st) => st.ui
  );
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

  const { data: products, isFetching: isProductsLoading } = useGetProductsQuery(
    {
      d: calendarSelector.d,
      dd: calendarSelector.dd,
      m: mpSelector[0],
      user_id: shopSelector,
    },
    { skip }
  );

  const productIds = useMemo(
    () =>
      Array.isArray(products)
        ? products
            .filter((pr) => !(pr.name === "Карточка удалена" || pr.name === ""))
            .map((pr) => pr.nm_id)
        : [],
    [products]
  );

  const skipSalesDynamics = useMemo(
    () => productIds.length === 0,
    [productIds.length]
  );

  const { data, isFetching } = useGetSalesDynamicsQuery(
    {
      d: calendarSelector.d,
      dd: calendarSelector.dd,
      nm_id: productIds,
    },
    { skip: skipSalesDynamics }
  );

  const isLoading = useMemo(
    () => isProductsLoading || isFetching,
    [isFetching, isProductsLoading]
  );
  const salesDynamicsData = useMemo(
    () => (data != null ? data : { brands: [], graph: [] }),
    [data]
  );

  return (
    <>
      <HelmetTitle title="salesDynamics" />
      {IS_DEV ? (
        <>
          <AreaChartBrands
            isLoading={isLoading}
            salesDynamicsData={salesDynamicsData}
          />
          <TableWeek
            isLoading={isLoading}
            salesDynamicsData={salesDynamicsData}
          />
          <BrandsTable
            isLoading={isLoading}
            salesDynamicsData={salesDynamicsData}
          />
        </>
      ) : (
        <OnReconstructionPage />
      )}
    </>
  );
};

export default SalesDynamicsPage;
