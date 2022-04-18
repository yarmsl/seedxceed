import { useTranslation } from "react-i18next";
import { Box, Typography, SxProps } from "@mui/material";
import { SendMailForm } from "../../organisms/SendMailForm/SendMailForm";

export const ScannerPageFooter = () => {
  const { t } = useTranslation("scanner");

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={{ width: { xs: "100%", md: "50%" }, mb: { xs: "35px" } }}>
          <Typography variant="h5" sx={styles.title}>
            {t`ourExpTitle`}
          </Typography>

          <Typography sx={styles.about}>{t`ourExp`}</Typography>
        </Box>

        <Box>
          <SendMailForm />
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: { xs: "column", md: "row" },
    zIndex: 2,
    position: "relative",
    pt: { xs: "55px" },

    p: { md: "170px 50px 60px" },
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
  },
  title: {
    color: "common.black",
    fontWeight: "bold",
    paddingBottom: "24px",
    paddingLeft: { xs: "15px" },
  },
  about: {
    color: "common.black",
    fontSize: "22px",
    lineHeight: "30px",
    paddingLeft: { xs: "15px" },
  },
};
