import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { ReactComponent as Service } from "../../../assets/common/construct.svg";

const ErrorPage = ({ title }: IErrorPageProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        overflow: "hidden",
        "& svg": {
          height: "500px",
          objectFit: "contain",
        },
      }}
    >
      <Service />
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default memo(ErrorPage);
