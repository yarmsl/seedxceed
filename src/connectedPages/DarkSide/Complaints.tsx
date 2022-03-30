import { memo } from "react";
import HelmetTitle from "../../UI/atoms/Helmet";
import Complaints from "../../UI/organisms/Complaints/Complaints"

const ComplaintsPage = () => {
  return (
    <>
      <HelmetTitle title="complaints" />
      <Complaints/>
    </>
  );
};

export default memo(ComplaintsPage);
