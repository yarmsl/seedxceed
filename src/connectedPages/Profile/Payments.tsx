import { memo } from "react";
import Helmet from "../../UI/atoms/Helmet";
import Payments from "../../UI/organisms/Profile/Payments";

const PaymentsPage = (): JSX.Element => {
  return (
    <>
      <Helmet title="payments" />
      <Payments />
    </>
  );
};

export default memo(PaymentsPage);
