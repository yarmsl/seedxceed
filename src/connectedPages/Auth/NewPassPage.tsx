import { memo } from "react";
import NewPassword from "UI/organisms/RecoveryPassword/NewPassword";
import HelmetTitle from "../../UI/atoms/Helmet";

const NewPassPage = (): JSX.Element => {
  return (
    <>
      <HelmetTitle title="forgot" />
      <NewPassword />
    </>
  );
};

export default memo(NewPassPage);
