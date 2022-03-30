import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { uiSelectorsConf } from "../configuration/uiSelectorsConf.conf";
import { pathParse } from "./helpers";

export const useUiSelectors = () => {
  const loc = useLocation();
  const par = useParams();
  const path = useMemo(
    () =>
      par.id != null
        ? `/${pathParse(loc.pathname, "start")}/:id`
        : loc.pathname,
    [loc.pathname, par.id]
  );
  const conf = uiSelectorsConf.find((conf) => conf.path === path) || {
    path: "/dashboard",
    tsType: null,
    mpsType: null,
    ssType: null,
    liveType: null,
  };

  return { ...conf };
};
