import { Box, Container, SxProps } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store";
import { Suspense } from "react";
import Loading from "UI/atoms/Loading/Loading";
import SeedXceedLogo from "UI/atoms/Logo/SeedXceedLogo";

const AuthLayout = (): JSX.Element => {
  const { darkMode } = useAppSelector((st) => st.ui);
  return (
    <Suspense fallback={<Loading />}>
      <Container disableGutters sx={styles.wrapper} maxWidth={false}>
        <Box sx={darkMode ? dark : light}>
          <SeedXceedLogo />
          <Outlet />
        </Box>
      </Container>
    </Suspense>
  );
};

const styles: Record<string, SxProps> = {
  wrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "background.default",
  },
  root: {
    width: { xs: "100%", sm: "400px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 1,
    p: "24px",
    bgcolor: "background.default",
  },
  lightShadow: {
    boxShadow: {
      xs: "none",
      sm: "20px 20px 60px #d9d9d9,-20px -20px 60px #ffffff",
    },
  },
  darkShadow: {
    boxShadow: {
      xs: "none",
      sm: "30px 30px 61px #0e152d,-30px -30px 61px #141d3f",
    },
  },
};

const light = { ...styles.root, ...styles.lightShadow };
const dark = { ...styles.root, ...styles.darkShadow };

export default AuthLayout;
