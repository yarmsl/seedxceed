import { Box } from "@mui/material";
import { memo } from "react";
import { ReactComponent as Logo } from "../../../assets/logo/logo.svg";

const SeedXceedLogo = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "40px",
        overflow: "hidden",
        position: "relative",
        "& svg": {
          width: "240px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-49%, -50%)",
        },
      }}
    >
      <Logo />
    </Box>
  );
};

export default memo(SeedXceedLogo);
