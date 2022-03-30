import { memo } from "react";
import {
  Button,
  Grid,
  Typography,
  SxProps,
  Box,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { closeModalAction } from "store/ModalStack";
import { useDispatch } from "react-redux";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrowLeft.svg";
import CloseIcon from "@mui/icons-material/Close";
export const PolicyModal = () => {
  const { t } = useTranslation("policy");
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={styles.root}>
        <Grid sx={{ whiteSpace: "pre-wrap" }}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              onClick={() => dispatch(closeModalAction())}
              sx={styles.iconClose}
            >
              <CloseIcon sx={{ color: "#9E9E9E" }} />
            </IconButton>
          </Box>

          <Typography variant="h4" align="center">
            {t("policy")}
          </Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title1")}
          </Typography>
          <Typography>{t("11")}</Typography>
          <Typography>{t("12")}</Typography>
          <Typography>{t("13")}</Typography>
          <Typography>{t("14")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title2")}
          </Typography>
          <Typography>{t("21")}</Typography>
          <Typography>{t("22")}</Typography>
          <Typography>{t("23")}</Typography>
          <Typography>{t("24")}</Typography>
          <Typography>{t("25")}</Typography>
          <Typography>{t("26")}</Typography>
          <Typography>{t("27")}</Typography>
          <Typography>{t("28")}</Typography>
          <Typography>{t("29")}</Typography>
          <Typography>{t("210")}</Typography>
          <Typography>{t("211")}</Typography>
          <Typography>{t("212")}</Typography>

          <Typography>{t("213")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title3")}
          </Typography>
          <Typography>{t("31")}</Typography>
          <Typography>{t("32")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title4")}
          </Typography>
          <Typography>{t("41")}</Typography>
          <Typography>{t("42")}</Typography>
          <Typography>{t("43")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title5")}
          </Typography>

          <Typography>{t("51")}</Typography>
          <Typography>{t("52")}</Typography>
          <Typography>{t("53")}</Typography>
          <Typography>{t("54")}</Typography>
          <Typography>{t("55")}</Typography>
          <Typography>{t("56")}</Typography>
          <Typography>{t("57")}</Typography>
          <Typography>{t("58")}</Typography>
          <Typography>{t("59")}</Typography>
          <Typography>{t("591")}</Typography>
          <Typography>{t("592")}</Typography>
          <Typography>{t("593")}</Typography>
          <Typography>{t("594")}</Typography>

          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title6")}
          </Typography>
          <Typography>{t("61")}</Typography>
          <Typography>{t("62")}</Typography>
          <Typography>{t("63")}</Typography>
          <Typography>{t("64")}</Typography>
          <Typography>{t("65")}</Typography>
          <Typography>{t("66")}</Typography>

          <Typography>{t("67")}</Typography>

          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title7")}
          </Typography>
          <Typography>{t("71")}</Typography>
          <Typography>{t("72")}</Typography>
          <Typography>{t("73")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title8")}
          </Typography>
          <Typography>{t("81")}</Typography>
          <Typography>{t("82")}</Typography>
          <Typography>{t("83")}</Typography>

          <Typography>{t("84")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title9")}
          </Typography>
          <Typography>{t("91")}</Typography>
          <Typography>{t("92")}</Typography>
          <Typography>{t("93")}</Typography>
          <Typography>{t("94")}</Typography>
          <Typography>{t("95")}</Typography>
          <Typography>{t("96")}</Typography>

          <Typography>{t("97")}</Typography>
          <Typography>{t("10")}</Typography>

          <Typography>{t("101")}</Typography>
          <Typography>{t("102")}</Typography>
          <Typography>{t("103")}</Typography>
          <Typography>{t("104")}</Typography>
          <Typography>{t("105")}</Typography>
          <Typography>{t("106")}</Typography>
          <Typography>{t("107")}</Typography>

          <Typography>{t("108")}</Typography>
          <Typography>{t("109")}</Typography>

          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title11")}
          </Typography>
          <Typography>{t("111")}</Typography>
          <Typography>{t("112")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("title12")}
          </Typography>
          <Typography>{t("121")}</Typography>

          <Typography>{t("122")}</Typography>

          <Typography>{t("13title")}</Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t("14title")}
          </Typography>
          <Typography>{t("141")}</Typography>
          <Typography>{t("142")}</Typography>
          <Typography>{t("143")}</Typography>
        </Grid>

        <Grid sx={{ paddingTop: 3 }}>
          <Button
            variant="text"
            href="#contained-buttons"
            onClick={() => dispatch(closeModalAction())}
          >
            <Grid container alignItems="center">
              <ArrowLeft />
              <Typography>{t("Back")}</Typography>
            </Grid>
          </Button>
        </Grid>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    bgcolor: "background.default",
    border: "2px solid #000",
    p: 4,
    "&  .MuiDialog-paperScrollPaper": {
      bgcolor: "none",
    },
  },
  arrowLeft: {
    marginBottom: "2px",
  },

  titleModal: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

export default memo(PolicyModal);
