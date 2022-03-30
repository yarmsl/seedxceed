import { Container, SxProps } from "@mui/material";
import { memo, Suspense, useEffect, useMemo } from "react";
import { batch } from "react-redux";
import { Outlet } from "react-router-dom";
import { dashboardAPI } from "store/Dashboard";
import { openModal } from "store/ModalStack";
import { setWarningWindowProps } from "store/UI";
import Loading from "UI/atoms/Loading/Loading";
import WarningRunet from "UI/atoms/WarningRunet/WarningRunet";
import Header from "UI/organisms/Header/Header";
import MainMenuDesktop from "UI/organisms/MainMenu/MainMenuDesktop";
import MainMenuMobile from "UI/organisms/MainMenu/MainMenuMobile";
import { useMedia } from "../../lib/useMedia";
import { useAppSelector, useAppDispatch } from "../../store";
import { getUserThunkAction } from "../../store/User";
import { LANG } from "../../configuration/baseUrls";

const MainLayout = (): JSX.Element => {
  const { id } = useAppSelector((st) => st.auth.user);
  const { count, timestamp } = useAppSelector((st) => st.ui.warningWindow);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id != null) {
      batch(() => {
        dispatch(getUserThunkAction(id));
        dispatch(
          dashboardAPI.util.prefetch("getLinkedShops", "", { force: true })
        );
      });
    }
  }, [dispatch, id]);

  const isDayPassed = useMemo(
    () =>
      new Date().getTime() - new Date(timestamp).getTime() >
      24 * 60 * 60 * 1000,
    [timestamp]
  );

  useEffect(() => {
    if (LANG === "ru") {
      if (count === 0) {
        dispatch(openModal(<WarningRunet />));
        dispatch(setWarningWindowProps());
      } else if (count < 3 && isDayPassed) {
        dispatch(openModal(<WarningRunet />));
        dispatch(setWarningWindowProps());
      }
    }
  }, [count, dispatch, isDayPassed]);

  const { isPortable } = useMedia();
  return (
    <Container sx={styles.wrapper} disableGutters maxWidth={false}>
      <Header />
      <Container disableGutters sx={styles.root} maxWidth="xl">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
      {isPortable ? <MainMenuMobile /> : <MainMenuDesktop />}
    </Container>
  );
};

const styles: Record<string, SxProps> = {
  wrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "64px",
    pl: { sm: "0px", md: "56px" },
  },
  root: {
    flexGrow: 1,
    p: "0 12px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default memo(MainLayout);
