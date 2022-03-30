import { Box, SxProps, Typography } from "@mui/material";
import { memo } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "react-i18next";
import ImagesUpload from "../ImagesUpload/ImagesUpload";
import VideoUpload from "../VideoUpload/VideoUpload";
// import StereoPhotoUpload from "../StereoPhotoUpload/StereoPhotoUpload";

const NewCardFilesUpload = () => {
  const { t } = useTranslation("newCard");
  return (
    <Box sx={styles.root}>
      <Typography variant="h6" gutterBottom>
        {t`uploadPhotoes`}
      </Typography>
      <Box sx={styles.subtitle}>
        <InfoOutlinedIcon color="info" />
        <Typography sx={{ ml: "6px" }} variant="body2">
          {t`recommendPhoto`}
        </Typography>
      </Box>
      <ImagesUpload />
      {/* <StereoPhotoUpload /> */}
      <VideoUpload />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    bgcolor: "common.white",
    borderRadius: 1,
    p: "12px",
  },
  subtitle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    mb: "12px",
  },
};

export default memo(NewCardFilesUpload);
