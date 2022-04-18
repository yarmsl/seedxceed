import { useTranslation } from "react-i18next";
import { useState, ChangeEvent, useCallback } from "react";
import { Box, Typography, SxProps, Stack, Slider } from "@mui/material";
import { IScannerCardSliderProps } from "./types";
import { useAppSelector } from "store";

export const ScannerCardUpdateSlider: React.FC<IScannerCardSliderProps> = ({
  imgCardDark,
  imgCardGoodDark,
  imgCard,
  imgCardGood,
}: IScannerCardSliderProps) => {
  const [newValue, setValue] = useState<number>(0);
  const { darkMode } = useAppSelector((st) => st.ui);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement> | Event,
      newValue: number | number[],
      activeThumb: number
    ) => {
      if (!Array.isArray(newValue)) {
        setValue(newValue);
      }
    },
    []
  );

  const { t } = useTranslation("scanner");

  return (
    <>
      <Box sx={styles.root}>
        <Box>
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              width: "100%",
            }}
            justifyContent={"center"}
          >
            <img
              alt="goodCard"
              src={darkMode ? imgCardGoodDark : imgCardGood}
              style={{
                opacity: `${newValue / 100}`,
                position: "absolute",
                maxWidth: "100%",
              }}
            />
            <img
              alt="BadCard"
              src={darkMode ? imgCardDark : imgCard}
              style={{
                opacity: `${1 - newValue / 100}`,
                maxWidth: "100%",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Stack
            direction={"row"}
            sx={{ width: "100%" }}
            justifyContent={"center"}
          >
            <Typography sx={{ mr: "10px" }}>{t`improveCard`}</Typography>
            <Slider
              value={typeof newValue === "number" ? newValue : 0}
              onChange={handleChange}
              aria-labelledby="input-slider"
              sx={{ width: "50%", marginRight: "10px", marginLeft: "10px" }}
            />
            <Typography id="non-linear-slider" gutterBottom>
              {newValue} %
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "calc(100% - 12px)", sm: "622px" },
    height: { xs: "300px", sm: "384px" },
    boxSizing: "border-box",
    p: "12px",
    m: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "background.default",
    borderRadius: 1,
    justifyContent: "center",
    boxShadow: "0px 25px 50px rgba(30, 136, 229, 0.2)",
  },
};
