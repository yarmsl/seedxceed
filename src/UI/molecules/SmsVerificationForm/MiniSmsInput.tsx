import { Box, SxProps } from "@mui/material";
import { forwardRef } from "react";
import { useAppSelector } from "store";

const MiniSmsInput = (
  props: IMiniSmsInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const { darkMode } = useAppSelector((st) => st.ui);
  return (
    <Box sx={darkMode ? dark : light}>
      <input {...props} ref={ref} />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "60px", sm: "75px" },
    height: "45px",
    borderRadius: 1,
    overflow: "hidden",
    color: "text.primary",
  },
  light: {
    "& input": {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "grey.100",
      outline: "none",
      border: "none",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: 500,
      transition: "background-color 200ms ease-in-out",
      color: "inherit",
      "&:focus": {
        bgcolor: "grey.200",
      },
    },
  },
  dark: {
    "& input": {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "background.paper",
      outline: "none",
      border: "none",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: 500,
      transition: "background-color 200ms ease-in-out",
      color: "inherit",
      "&:focus": {
        bgcolor: "#1d1e33",
      },
    },
  },
};

const light = { ...styles.root, ...styles.light };
const dark = { ...styles.root, ...styles.dark };

export default forwardRef(MiniSmsInput);
