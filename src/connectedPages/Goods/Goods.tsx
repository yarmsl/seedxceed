import { memo } from "react";
import ProductsTableConnected from "UI/organisms/ProductsTable/ProductsTableConnected";
import HelmetTitle from "../../UI/atoms/Helmet";

const GoodsPage = () => {
  return (
    <>
      <HelmetTitle title="goods" />
      <ProductsTableConnected />
    </>
  );
};

export default memo(GoodsPage);
