import { Paper, SxProps } from "@mui/material";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "store/Products";
import Loading from "UI/atoms/Loading/Loading";
import ProductPhoto from "UI/atoms/ProductPhoto/ProductPhoto";
import ProductChart from "UI/molecules/ProductChart/ProductChart";
import ProductInfo from "UI/molecules/ProductInfo/ProductInfo";
import SalesCardsConnected from "UI/molecules/SalesCardsConnected/SalesCardsConnected";
import HelmetTitle from "../../UI/atoms/Helmet";

const ProductPage = () => {
  const params = useParams();

  const skip = useMemo(
    () => params.id == null || params.mp == null || params.shop == null,
    [params.id, params.mp, params.shop]
  );

  const { data, isLoading } = useGetProductByIdQuery(
    {
      id: `${params.id}`,
      d: 90,
      dd: 90,
      m: `${params.mp as supportedMarketTypes}`,
      user_id: [`${params.shop}`],
    },
    { skip }
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <HelmetTitle title={data?.name || ""} needNoTranslation />
      <Paper sx={styles.root}>
        <ProductPhoto
          photo={data?.photo}
          title={data?.name}
          link={data?.link}
        />
        <SalesCardsConnected
          data={data?.cardsData || []}
          isLoading={isLoading}
        />
        <ProductInfo data={data} />
        <ProductChart data={data?.graphData || []} isLoading={isLoading} />
      </Paper>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    borderRadius: 1,
    flexGrow: 1,
    width: "100%",
    p: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-of-type)": {
      mb: "12px",
    },
  },
};

export default memo(ProductPage);
