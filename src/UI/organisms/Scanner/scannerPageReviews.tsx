import { useTranslation } from "react-i18next";
import { Box, Typography, SxProps } from "@mui/material";

export const ScannerPageReviews = () => {
  const { t } = useTranslation("scanner");

  return (
    <>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Box sx={styles.root}>
          <Typography variant="h5" sx={styles.title}>
            {t`custSayTitle`}
          </Typography>
          <Box />

          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography sx={styles.arrow}>«</Typography>
            </Box>
            <Typography sx={styles.about}>{t`reviewSaller`}</Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Typography sx={styles.arrow2}>»</Typography>
            </Box>
          </Box>
          <Box sx={{ paddingTop: "40px" }}>
            <Typography variant="subtitle1" sx={styles.saller}>
              {t`saller`}
            </Typography>
            <Typography variant="subtitle2" sx={styles.sallerAbout}>
              {t`sallerAbout`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  content: {
    flexGrow: 1,
    textAlign: "center",
  },
  title: {
    p: "60px 0 32px 0",
    color: "common.black",
    fontWeight: "bold",
  },
  root: {
    width: { xs: "calc(100% - 12px)", sm: "645px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    zIndex: 2,
    position: "relative",
  },
  about: {
    color: "common.black",
    fontSize: "20px",
    lineHeight: "28px",
  },
  arrow: {
    fontSize: { xs: "65px", sm: "96px" },
    color: "common.black",
    textAlign: "left",
    lineHeight: " 30px",
  },
  arrow2: {
    fontSize: { xs: "65px", sm: "96px" },
    textAlign: "end",
    color: "common.black",
    lineHeight: "40px",
  },
  saller: {
    fontSize: "16px",
    lineHeight: "19px",
    fontWeight: 500,
  },
  sallerAbout: {
    pt: "8px",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "16px",
  },
};
