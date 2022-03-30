import { memo } from "react";
import OnReconstructionPage from "UI/atoms/ServicePages/OnReconstructionPage";
import HelmetTitle from "../../UI/atoms/Helmet";

const TemplatesPage = () => {
  return (
    <>
      <HelmetTitle title="templates" />
      <OnReconstructionPage />
    </>
  );
};

export default memo(TemplatesPage);
