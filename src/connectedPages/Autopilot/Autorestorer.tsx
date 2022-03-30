import { memo } from "react";
import Helmet from "UI/atoms/Helmet";

const AutorestorerPage = () => {
  return (
    <>
      <Helmet title="autoRepair" />
      Автовосстановитель
    </>
  );
};

export default memo(AutorestorerPage);
