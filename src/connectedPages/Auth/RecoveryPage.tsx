import { memo } from "react";
import RecoveryPassword from "UI/organisms/RecoveryPassword/RecoveryPassword";
import HelmetTitle from "../../UI/atoms/Helmet";

const RecoveryPage = (): JSX.Element => {
  return (
    <>
      <HelmetTitle title="forgot" />
      <RecoveryPassword />
    </>
  );
};

export default memo(RecoveryPage);
