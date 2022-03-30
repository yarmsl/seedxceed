import { Box, SwipeableDrawer, SxProps } from "@mui/material";
import { memo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../store";
import { toggleBurgerMenu } from "../../../store/UI";

const MainMenuMobileLayout = ({ children }: IMainMenuProps) => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const dispatch = useAppDispatch();
  const { burgerMenu } = useAppSelector((st) => st.ui);
  const toggleMenu = useCallback(
    () => dispatch(toggleBurgerMenu()),
    [dispatch]
  );
  return (
    <SwipeableDrawer
      anchor="left"
      open={burgerMenu}
      onOpen={toggleMenu}
      onClose={toggleMenu}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <Box sx={styles.root}>{children}</Box>
    </SwipeableDrawer>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    minWidth: "260px",
    maxWidth: "300px",
    height: "100%",
    p: "24px 8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    bgcolor: "background.default",
  },
};

export default memo(MainMenuMobileLayout);
