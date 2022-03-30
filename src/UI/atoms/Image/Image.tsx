import { Box } from "@mui/system";
import { memo, useState } from "react";
import { ReactComponent as PhIcon } from "../../../assets/logo/icon.svg";

const Image = ({ img, width = "60px", height = "60px" }: IImageProps) => {
  const [err, setErr] = useState(false);
  return (
    <Box
      sx={{
        width,
        height,
        minWidth: width,
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: 3,
        "& img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        },
        "& svg": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        },
      }}
    >
      {!err ? (
        <img src={img} alt="product" onError={() => setErr(true)} />
      ) : (
        <PhIcon />
      )}
    </Box>
  );
};

export default memo(Image);
