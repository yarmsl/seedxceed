import { Box, ButtonBase, SxProps, Typography } from "@mui/material";
import { memo } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTranslation } from "react-i18next";

const ImagePreviewCard = ({
  index,
  src,
  remove,
  toFirstPlace,
}: IImagePreviewCardProps) => {
  const { t } = useTranslation("newCard");

  return (
    <Box sx={styles.root}>
      <img src={src} alt={`preview-${index}`} />
      <ButtonBase sx={styles.remove} onClick={() => remove(index)}>
        <ClearRoundedIcon fontSize="small" color="primary" />
      </ButtonBase>
      {index === 0 && (
        <Box sx={styles.favorite}>
          <StarIcon fontSize="small" color="primary" />
        </Box>
      )}
      {index > 0 && (
        <ButtonBase
          id="toFav"
          sx={styles.tofav}
          onClick={() => toFirstPlace(index)}
        >
          <StarBorderIcon color="primary" />
          <Typography color="primary" sx={{ ml: "6px" }}>
            {t`makeMain`}
          </Typography>
        </ButtonBase>
      )}
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
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    "&:hover": {
      "& #toFav": {
        bottom: 0,
        transition: "bottom 250ms ease-in-out",
      },
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
  favorite: {
    width: "22px",
    height: "22px",
    position: "absolute",
    borderRadius: 0.2,
    border: "1px solid #90CAF9",
    bgcolor: "common.white",
    top: "12px",
    left: "12px",
  },
  tofav: {
    width: "100%",
    p: "12px 0",
    position: "absolute",
    bottom: -48,
    transition: "bottom 250ms ease-in-out",
    left: 0,
    right: 0,
    bgcolor: "background.paper",
  },
};

export default memo(ImagePreviewCard);
