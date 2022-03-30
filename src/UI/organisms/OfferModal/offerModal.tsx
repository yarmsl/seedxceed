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
import { useDispatch } from "react-redux";
import { closeModalAction } from "../../../store/ModalStack";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrowLeft.svg";
import CloseIcon from "@mui/icons-material/Close";

export const OfferModal = () => {
  const { t } = useTranslation("publicOffer");
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
          <Typography variant="h3" align="center" sx={styles.titleModal}>
            {t`poTitle`}
          </Typography>
          <Typography>{t`poDescription`}</Typography>

          <Typography variant="h4" align="center" sx={styles.titleModal}>
            {t`poTermDescription`}
          </Typography>
          <Typography>{t`poTermDescription1`}</Typography>
          <Typography>{t`poTermDescription2`}</Typography>
          <Typography variant="h4" align="center" sx={styles.titleModal}>
            {t`poGeneralProvisions`}
          </Typography>
          <Typography>{t`poGeneralProvisions1`}</Typography>
          <Typography>{t`poGeneralProvisions2`}</Typography>
          <Typography>{t`poGeneralProvisions3`}</Typography>
          <Typography>{t`poGeneralProvisions4`}</Typography>
          <Typography variant="h4" align="center" sx={styles.titleModal}>
            {t`poServicePrice`}
          </Typography>
          <Typography>{t`poServicePrice1`}</Typography>
          <Typography>{t`poServicePrice2`}</Typography>
          <Typography>{t`poServicePrice3`}</Typography>
          <Typography>{t`poServicePrice4`}</Typography>
          <Typography>{t`poServicePrice5`}</Typography>
          <Typography>{t`poServicePrice6`}</Typography>
          <Typography>{t`poServicePrice7`}</Typography>
          <Typography variant="h4" align="center" sx={styles.titleModal}>
            {t`poOrderPlacement`}
          </Typography>
          <Typography>{t`poOrderPlacement1`}</Typography>
          <Typography>{t`poOrderPlacement2`}</Typography>
          <Typography>{t`poOrderPlacement3`}</Typography>
          <Typography>{t`poOrderPlacement4`}</Typography>
          <Typography>{t`poOrderPlacement5`}</Typography>
          <Typography>{t`poOrderPlacement6`}</Typography>
          <Typography>{t`poOrderPlacement7`}</Typography>
          <Typography>{t`poOrderPlacement8`}</Typography>
          <Typography variant="h4" align="center" sx={styles.titleModal}>
            {t`poSelersDetails`}
          </Typography>
          <Typography variant="h4" align="left">
            {t`poSelersDetails1`}
          </Typography>
          <Typography sx={styles.titleModal}>
            {t`poSelersDetails2`}
            {"\n"}
            {t`poSelersDetails3`}
            {"\n"}
            {t`poSelersDetails4`}
          </Typography>
          <Typography variant="h4" align="left" sx={styles.titleModal}>
            {t`poSelersDetails5`}
          </Typography>
          <Typography>
            {t`poSelersDetails6`}
            {"\n"}
            {t`poSelersDetails7`}
            {"\n"}
            {t`poSelersDetails8`}
            {"\n"}
            {t`poSelersDetails9`}
          </Typography>

          <Typography sx={styles.titleModalItalick}>
            {t`poSelersDetails10`}
          </Typography>
        </Grid>

        <Grid sx={{ paddingTop: 3 }}>
          <Button
            variant="text"
            href="#contained-buttons"
            onClick={() => dispatch(closeModalAction())}
          >
            <Grid container alignItems="center">
              <ArrowLeft />
              <Typography>{t("goBack")}</Typography>
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
  },
  arrowLeft: {
    marginBottom: "2px",
  },

  titleModal: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleModalItalick: {
    paddingTop: 5,
    paddingBottom: 5,
    fontStyle: "italic",
  },
};

export default memo(OfferModal);
