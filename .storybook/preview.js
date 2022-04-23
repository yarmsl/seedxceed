import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import { addDecorator } from "@storybook/react";
import { theme as muiTheme } from "../src/UI/theme";
import { ThemeProvider } from "emotion-theming";
import { i18n } from "./i18next";

addDecorator((Story, context) => {
  const theme = createTheme(muiTheme(context.globals.theme === "dark"));
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </MuiThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
});

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: ["light", "dark"],
      showName: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: "ru",
  locales: {
    ru: "Русский",
    en: "English",
    pt: "Português",
  },
};
