import { Box, SxProps } from "@mui/material";
import { memo } from "react";

const MainMenuDestkopLayout = ({ children }: IMainMenuProps): JSX.Element => {
  return <Box sx={styles.root}>{children}</Box>;
};

const styles: Record<string, SxProps> = {
  root: {
    width: "56px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    p: "24px 6px 0",
    position: "fixed",
    left: 0,
    top: 0,
    bgcolor: "background.default",
    zIndex: "drawer",
    boxShadow: 3,
    transition: "width 250ms ease-out",
    "&:hover": {
      width: "250px",
      transition: "width 250ms ease-in",
    },
  },
};

export default memo(MainMenuDestkopLayout);
