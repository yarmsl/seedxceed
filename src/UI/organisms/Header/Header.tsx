import { lazy, memo, Suspense, useMemo } from "react";
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  SxProps,
  Toolbar,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "lib/useMedia";
import { toggleBurgerMenu } from "store/UI";
import Breadcrumb from "UI/atoms/Breadcrumbs/Breadcrumb";
import { isAtLeastOneLinkedShop } from "store/Dashboard";
import AddStoreButton from "UI/atoms/AddStoreButton/AddStoreButton";
import { useScroll } from "lib/useScroll";

const MarketPlacesSelector = lazy(
  () => import("UI/atoms/MarketPlacesSelector/MarketPlacesSelector")
);
const ShopsSelectors = lazy(
  () => import("UI/atoms/ShopsSelector/ShopsSelectors")
);
const CalendarSelector = lazy(
  () => import("UI/atoms/TimeStampSelector/CalendarSelector")
);
const WeekSelector = lazy(
  () => import("UI/atoms/TimeStampSelector/WeekSelector")
);

const Header = () => {
  const dispatch = useDispatch();
  const { isPortable } = useMedia();
  const isLinkedMPs = useSelector(isAtLeastOneLinkedShop);
  const isScrollTop = useScroll();
  const headerStyle = useMemo(
    () => (isScrollTop ? styles.root : headerWithShadow),
    [isScrollTop]
  );

  return (
    <AppBar color="transparent" sx={headerStyle}>
      <Toolbar disableGutters sx={styles.header}>
        <Box sx={styles.start}>
          {isPortable && (
            <IconButton onClick={() => dispatch(toggleBurgerMenu())}>
              <MenuRoundedIcon />
            </IconButton>
          )}
          <Breadcrumb />
        </Box>
        <Box sx={styles.controls}>
          {isLinkedMPs && (
            <Suspense fallback={<CircularProgress size={20} color="primary" />}>
              <CalendarSelector isPortable={isPortable} />
              <WeekSelector isPortable={isPortable} />
              <MarketPlacesSelector isPortable={isPortable} />
              <ShopsSelectors isPortable={isPortable} />
            </Suspense>
          )}
          <AddStoreButton isPortable={isPortable} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    pl: { sm: "0px", md: "56px" },
    boxShadow: "none",
    bgcolor: "background.default",
    minHeight: "64px",
    transition: "box-shadow 250ms ease-in-out",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: "0 12px",
  },
  start: {
    display: "flex",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mr: "12px",
    },
  },
  controls: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  profile: {
    position: "relative",
  },
  modal: {
    position: "absolute",
    top: "100%",
    right: "0px",
  },
  shadow: {
    boxShadow: "0px 4px 4px rgba(0,0,0,0.2)",
  },
};

const headerWithShadow = { ...styles.root, ...styles.shadow };

export default memo(Header);
