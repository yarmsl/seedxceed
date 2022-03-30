import { Box, ButtonBase, SxProps } from "@mui/material";
import { memo } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const StereoPhotoPreviewCard = ({
  index,
  src,
  remove,
}: IStereoPhotoPreviewCardProps) => {
  return (
    <Box sx={styles.root}>
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
    // "& img": {
    //   width: "100%",
    //   height: "100%",
    //   objectFit: "cover",
    //   objectPosition: "center",
    // },
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

export default memo(StereoPhotoPreviewCard);
