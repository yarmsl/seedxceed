import { memo } from "react";
import Helmet from "../../UI/atoms/Helmet";
import ProfilePage from "../../UI/organisms/Profile/Profile";

const Profile = (): JSX.Element => {
  return (
    <>
      <Helmet title="profile" />
      <ProfilePage />
    </>
  );
};

export default memo(Profile);
