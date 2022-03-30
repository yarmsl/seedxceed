import { Box } from "@mui/material";
import { memo } from "react";

const YouTubeBox = ({ embedId }: IYouTubeBoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
        overflow: "hidden",
        borderRadius: 1,
        boxShadow: 5,
        "& iframe": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      <iframe
        width="1280"
        height="720"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        style={{ borderRadius: "12px" }}
      />
    </Box>
  );
};

export default memo(YouTubeBox);
