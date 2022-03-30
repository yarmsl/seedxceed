import { memo } from "react";
import Helmet from "../../UI/atoms/Helmet";
import Safety from "../../UI/organisms/Profile/Safety";

const Security = (): JSX.Element => {
  return (
    <>
      <Helmet title="safty" />
      <Safety />
    </>
  );
};

export default memo(Security);
