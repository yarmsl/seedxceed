import { memo } from "react";
import MainMenuMobileLayout from "UI/molecules/MainMenuLayout/MainMenuMobile.layout";
import MainMenuConnected from "./MainMenuConnected";

const MainMenuMobile = () => {
  return (
    <MainMenuMobileLayout>
      <MainMenuConnected />
    </MainMenuMobileLayout>
  );
};

export default memo(MainMenuMobile);
