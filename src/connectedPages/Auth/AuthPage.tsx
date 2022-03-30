import { memo } from "react";
import Helmet from "../../UI/atoms/Helmet";
import { Auth } from "../../UI/organisms/Auth/Auth";

const AuthPage = (): JSX.Element => {
  return (
    <>
      <Helmet title="auth" />
      <Auth />
    </>
  );
};
export default memo(AuthPage);
