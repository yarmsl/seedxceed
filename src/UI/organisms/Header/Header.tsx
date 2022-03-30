import { lazy, memo, Suspense } from "react";
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
import { IS_DEV } from "configuration/baseUrls";

const TimeStampSelector = lazy(
  () => import("UI/atoms/TimeStampSelector/TimeStampSelector")
);
const MarketPlacesSelector = lazy(
  () => import("UI/atoms/MarketPlacesSelector/MarketPlacesSelector")
);
const ShopsSelectors = lazy(
  () => import("UI/atoms/ShopsSelector/ShopsSelectors")
);
const LiveTypesSelector = lazy(
  () => import("UI/atoms/LiveTypesSelector/LiveTypesSelector")
);
const CalendarSelector = lazy(
  () => import("UI/atoms/TimeStampSelector/CalendarSelector")
);

const Header = () => {
  const dispatch = useDispatch();
  const { isPortable } = useMedia();
  const isLinkedMPs = useSelector(isAtLeastOneLinkedShop);

  return (
    <AppBar color="transparent" sx={styles.root}>
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
              {IS_DEV ? (
                <CalendarSelector isPortable={isPortable} />
              ) : (
                <TimeStampSelector isPortable={isPortable} />
              )}
              <MarketPlacesSelector isPortable={isPortable} />
              <ShopsSelectors isPortable={isPortable} />
              <LiveTypesSelector isPortable={isPortable} />
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
};

export default memo(Header);
