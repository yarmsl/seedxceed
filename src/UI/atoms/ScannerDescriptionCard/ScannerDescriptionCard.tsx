import { memo } from "react";
import { IScannerDescriptionCardProps } from "./types";
import { Box, SxProps, Typography } from "@mui/material";

export const ScannerDescriptionCard: React.FC<IScannerDescriptionCardProps> = ({
  icon,
  description,
  title,
}: IScannerDescriptionCardProps) => {
  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.icons}>
          <img src={icon} alt={title} />
        </Box>
        <Box sx={styles.content}>
          <Typography sx={styles.title} variant="subtitle1">
            {title}
          </Typography>
          <Typography sx={styles.about} variant="subtitle2">
            {description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "calc(100% - 12px)", sm: "220px" },
    height: { xs: "250px", sm: "252px" },
    boxSizing: "border-box",
    p: "12px",
    m: "6px",
    mr: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "background.default",
    borderRadius: "12px",
    justifyContent: "center",
    boxShadow: "0px 25px 50px rgba(30, 136, 229, 0.2)",
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
  },
  title: {
    p: "8px 0",
    color: "common.black",
    fontSize: {xs: "23px", md: "16px"},
    fontWeight: {xs: 500}
  },
  icons: {
    paddingTop: "32px",
    "& img": {
      width: { xs: "70px", md: "60px" }
    }

  },
  about: {
    color: "#9E9E9E",
    fontSize: {md: "14px", xs: "18px"},
    lineHeight: "16px",
    fontWeight: "bold",

  },
};

export default memo(ScannerDescriptionCard);
