import { memo } from "react";
import { IScannerRatesCardProps } from "./types";
import { Box, SxProps, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "store/ModalStack";
import { PayModalScanner } from "../../organisms/PayModalScanner/payModalScanner";
import { SendMailForm } from "UI/organisms/SendMailForm/SendMailForm";

export const ScannerDescriptionCard: React.FC<IScannerRatesCardProps> = ({
  description,
  title,
  priceFor,
  buttonText,
  price,
  index,
}: IScannerRatesCardProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.content}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={styles.title}>{title}</Typography>
          </Box>
          <Box sx={styles.description}>
            <Typography variant="subtitle1">{description}</Typography>
          </Box>
          <Box sx={styles.description}>
            <Typography variant="subtitle1">
              {" "}
              {price} {priceFor}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            fullWidth
            sx={styles.buttons}
            onClick={() =>
              index === 3
                ? dispatch(openModal(<SendMailForm />))
                : dispatch(openModal(<PayModalScanner index={index} />))
            }
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "calc(100% - 12px)", sm: "325px" },
    height: { xs: "240px", sm: "225px" },
    boxSizing: "border-box",
    p: "12px",
    m: "6px",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.default",
    borderRadius: 1,
    justifyContent: "center",
    mr: "30px",
    mb: {xs: "25px"}
  },
  content: {
    flexGrow: 1,
  },
  title: {
    p: "8px 0",
    color: "common.black",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: {md: "16px", xs: "20px"},
    lineHeight: "19px",
  },
  buttons: {
    width: { xs: "calc(100% - 12px)", sm: "162px" },
    height: { xs: "calc(100% - 1px)", sm: "56px" },
  },
  description: {
    width: "100%",
    borderBottom: "1px solid #C4C4C4",
    paddingTop: "16px",
    color: "#9E9E9E",
    fontSize: "16px",
    lineHeight: "19px",
  },
};

export default memo(ScannerDescriptionCard);
