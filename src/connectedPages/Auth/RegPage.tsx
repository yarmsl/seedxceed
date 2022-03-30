import { memo } from "react";
import HelmetTitle from "../../UI/atoms/Helmet";
import { Reg } from "../../UI/organisms/Registration/Reg";

const RegPage = (): JSX.Element => {
  return (
    <>
      <HelmetTitle title="reg" />
      <Reg />
    </>
  );
};

export default memo(RegPage);
