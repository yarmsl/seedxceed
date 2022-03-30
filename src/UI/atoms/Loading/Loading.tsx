import { Backdrop, Box, CircularProgress } from "@mui/material";
import { memo } from "react";

const Loading = ({ fullscreen }: ILoadingProps) => {
  if (fullscreen) {
    return (
      <Backdrop
        sx={{ zIndex: "modal", bgcolor: "background.default" }}
        open={true}
      >
        <CircularProgress />
      </Backdrop>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
};

export default memo(Loading);
