import { memo } from "react";
import MainMenuDestkopLayout from "UI/molecules/MainMenuLayout/MainMenuDestkop.layout";
import MainMenuConnected from "./MainMenuConnected";

const MainMenuDesktop = () => {
  return (
    <MainMenuDestkopLayout>
      <MainMenuConnected />
    </MainMenuDestkopLayout>
  );
};

export default memo(MainMenuDesktop);
