import { useTranslation } from "react-i18next";
import { Box, Typography, SxProps } from "@mui/material";
import { ScannerCardUpdateSlider } from "../../atoms/ScannerUpdateCard/ScannerUpdateCardSlider";
import { ReactComponent as ArrorIcon } from "../../../../src/assets/icons/arrowScanner.svg";

export const ScannerCardUpdate = () => {
  const { t } = useTranslation("scanner");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "60px",
        }}
      >
        <Typography variant="h5" sx={styles.title}>
          {t`updateCardinfo`}
        </Typography>
        <Typography variant="subtitle1" sx={styles.content}>
          {t`tryUpdateCard`}
        </Typography>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex", pt: "20px" }}>
        <ScannerCardUpdateSlider
          imgCardDark={"/BadCardScannerDark.png"}
          imgCardGoodDark={"/GoodCardScannerDark.png"}
          imgCard={"/BadCardScanner.png"}
          imgCardGood={"/GoodCardScanner.png"}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ArrorIcon />
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  content: {
    color: "common.black",
    paddingTop: "16px",
  },
  title: {
    color: "common.black",
    fontWeight: "bold",
    textAlign: { xs: "center" },
  },
  icon: {
    paddingRight: "20px",
  },
};
