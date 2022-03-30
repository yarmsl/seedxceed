import { useTranslation } from "react-i18next";
import { Box, Typography, SxProps } from "@mui/material";
import { ReactComponent as ClockSvg } from "../../../assets/icons/scannerClock.svg";
import { SendMailForm } from "../../organisms/SendMailForm/SendMailForm";

export const ScannerPageHeader = () => {
  const { t } = useTranslation("scanner");

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h2" sx={styles.title}>
            {t`scanner`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Typography variant="h5" sx={styles.about}>
                {t`about`}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "50px",
                  paddingLeft: { xs: "15px" }


                }}
              >
                <ClockSvg />
                <Typography variant="h5" sx={styles.clockText}>
                  {t`result24`}
                </Typography>
              </Box>
            </Box>
            <Box>
              <SendMailForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    p:  {  md: "54px 60px 60px" },
    zIndex:2,
    position: "relative",
   
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
  },
  title: {
    p: "8px 0",
    color: "common.black",
    fontWeight: "bold",
    paddingLeft: { xs: "15px" }
  },
  icons: {
    paddingTop: "32px",
  },
  about: {
    color: "common.black",
    fontSize: "22px",
    lineHeight: "30px",
    paddingLeft: { xs: "15px" }


  },
  clockText: {
    paddingTop: "2px",
    color: "#FFFFFF",
    textTransform: "uppercase",
    paddingLeft: { xs: "5px" }


  },
};
