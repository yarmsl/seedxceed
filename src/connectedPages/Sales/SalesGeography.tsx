import { memo } from "react";
import HelmetTitle from "../../UI/atoms/Helmet";
import SalesGeography from "../../UI/organisms/SalesGeography/SalesGeography";

export const SalesGeographyPage = () => {
  return (
    <>
      <HelmetTitle title="geoSales" />
      <SalesGeography />
    </>
  );
};

export default memo(SalesGeographyPage);
