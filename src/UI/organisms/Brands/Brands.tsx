import { memo, useMemo, useState, useEffect, useCallback } from "react";
import BrandsSlider from "../../molecules/BrandsSlider/BrandsSlider";
import BrandsChart from "../../molecules/BrandsChart/BrandsChart";
import BrandsInfo from "../../molecules/BrandsInfo/BrandsInfo";
import { useAppSelector } from "../../../store";
import { selectedShopsSelector } from "../../../store/UI/UI.selectors";

const Brands = ({ brands = [], isFetching }: IBrandsProps): JSX.Element => {
  const activeShops = useAppSelector(selectedShopsSelector);

  const [activeBrand, setActiveBrand] = useState("");
  const [swiperIndex, setSwiperIndex] = useState<number>(0);

  const formatDate = (str: string) => {
    const arr = str.split("-");
    return `${arr[2]}.${arr[1]}.${arr[0]}`;
  };

  const brandDataChart = useMemo(() => {
    return brands.map((brand: IBrandsState) => {
      return {
        ...brand,
        graph: Object.keys(brand.graph).map((date) => ({
          ...brand.graph[date],
          date: formatDate(date),
        })),
      };
    });
  }, [brands]);

  const oneBrandData = useCallback(
    (idx: number) => {
      return brandDataChart[idx];
    },
    [brandDataChart]
  );

  const graphData = useMemo(() => {
    return oneBrandData(swiperIndex) != null
      ? oneBrandData(swiperIndex).graph
      : [];
  }, [oneBrandData, swiperIndex]);

  const topSalesBrand = useMemo(() => {
    return oneBrandData(swiperIndex) != null
      ? oneBrandData(swiperIndex).top_5_products
      : [];
  }, [oneBrandData, swiperIndex]);

  const summaryBrand = useMemo(() => {
    return oneBrandData(swiperIndex) != null
      ? oneBrandData(swiperIndex).summary
      : { sales: 0, orders: 0, days_on_sale: 0, returns: 0, products_count: 0 };
  }, [oneBrandData, swiperIndex]);

  useEffect(() => {
    setSwiperIndex(0);
  }, [activeShops]);

  return (
    <>
      <BrandsSlider
        data={brands}
        activeBrand={activeBrand}
        changeActiveBrand={(brand: string) => setActiveBrand(brand)}
        swiperIndex={swiperIndex}
        changeIndex={(idx: number) => setSwiperIndex(idx)}
      />
      <BrandsChart data={graphData} isLoading={isFetching} />
      <BrandsInfo topSales={topSalesBrand} summary={summaryBrand} />
    </>
  );
};

export default memo(Brands);
