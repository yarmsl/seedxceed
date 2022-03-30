import { Box, ButtonBase, SxProps } from "@mui/material";
import { memo } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ReactPlayer from "react-player/lazy";

const VideoPreviewCard = ({ index, src, remove }: IVideoPreviewCardProps) => {
  return (
    <Box sx={styles.root}>
      <ReactPlayer
        width="200px"
        height="275px"
        url={src}
        playing={true}
        loop={true}
        volume={0.1}
        muted={true}
        controls={true}
      />
      <ButtonBase sx={styles.remove} onClick={() => remove(index)}>
        <ClearRoundedIcon fontSize="small" color="primary" />
      </ButtonBase>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "200px",
    height: "275px",
    position: "relative",
    m: "6px",
    borderRadius: 1,
    overflow: "hidden",
    "& video": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
  remove: {
    position: "absolute",
    borderRadius: 0.2,
    border: "1px solid #90CAF9",
    bgcolor: "common.white",
    top: "12px",
    right: "12px",
  },
};

export default memo(VideoPreviewCard);
