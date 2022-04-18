import { memo, Suspense, useMemo } from "react";
import { Box, Paper, SxProps, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loading from "UI/atoms/Loading/Loading";
import { pathParse } from "lib/helpers";
import { useScroll } from "lib/useScroll";

interface ITabsLayoutProps {
  pageConf: {
    title: string;
    path: string;
  }[];
}

const TabsLayout = ({ pageConf }: ITabsLayoutProps) => {
  const { t } = useTranslation("menu");
  const nav = useNavigate();
  const loc = useLocation();
  const isScrollTop = useScroll();
  const tabIndex = useMemo(() => {
    const i = pageConf
      .map((page) => page.path)
      .indexOf(pathParse(loc.pathname));
    return i < 0 ? 0 : i;
  }, [loc.pathname, pageConf]);

  const tabsShadow = useMemo(
    () => (isScrollTop ? styles.tabs : tabsWithShadow),
    [isScrollTop]
  );

  return (
    <Box sx={styles.root}>
      <Tabs sx={tabsShadow} variant="scrollable" value={tabIndex}>
        {pageConf.map((page) => {
          return (
            <Tab
              key={page.title}
              label={t(page.title)}
              onClick={() => nav(page.path)}
            />
          );
        })}
      </Tabs>

      <Paper sx={styles.wrapper}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Paper>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    flexGrow: 1,
    width: "100%",
    minHeight: "100%",
    display: "flex",
    bgcolor: "background.default",
  },
  tabs: {
    width: "100%",
    pl: { xs: "24px", md: "80px" },
    pr: "24px",
    position: "fixed",
    bgcolor: "background.default",
    zIndex: "appBar",
    left: 0,
    transition: "box-shadow 250ms ease-in-out",
  },
  wrapper: {
    flexGrow: 1,
    width: "100%",
    p: "12px",
    mt: "56px",
    display: "flex",
    flexDirection: "column",
  },
  shadow: {
    boxShadow: "0px 4px 4px rgba(0,0,0,0.2)",
  },
};

const tabsWithShadow = { ...styles.tabs, ...styles.shadow };

export default memo(TabsLayout);
