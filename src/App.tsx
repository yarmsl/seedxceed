import { ReactElement, useEffect, useMemo } from "react";
import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import useNotifier from "./lib/Notifer";
import ModalStack from "./UI/atoms/ModalStack";
import Router from "./Router";
import { isAuthSelector, isAuthCheckedSelector } from "./store/Auth";
import { theme } from "./UI/theme";
import { useAppDispatch, useAppSelector } from "./store";
import { LANG } from "configuration/baseUrls";
import { setLocale } from "store/UI";

const App = (): ReactElement => {
  useNotifier();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const isCheckedAuth = useAppSelector(isAuthCheckedSelector);
  const { role } = useAppSelector((st) => st.user.data);
  const { darkMode, locale } = useAppSelector((st) => st.ui);
  const currentTheme = useMemo(() => theme(darkMode), [darkMode]);

  useEffect(() => {
    if (LANG === "ru") {
      dispatch(setLocale("ru"));
    } else {
      if (locale === "ru") {
        dispatch(setLocale("pt"));
      }
    }
  }, [dispatch, locale]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(currentTheme)}>
        <CssBaseline />
        <BrowserRouter>
          <Router isAuth={isAuth} isCheckedAuth={isCheckedAuth} role={role} />
        </BrowserRouter>
        <ModalStack />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
