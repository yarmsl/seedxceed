import { IconButton, Typography } from "@mui/material";
import { breadcrumbsConf } from "configuration/breadcrumbs.conf";
import { pathParse } from "lib/helpers";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Breadcrumb = () => {
  const { t } = useTranslation("menu");
  const loc = useLocation();
  const nav = useNavigate();
  const par = useParams();
  const path = useMemo(
    () =>
      par.id != null
        ? `/${pathParse(loc.pathname, "start")}/:id`
        : loc.pathname,
    [loc.pathname, par.id]
  );

  const bc = useMemo(
    () =>
      breadcrumbsConf.find((bread) => bread.path === path) || {
        breadcrumb: "",
        backwards: false,
      },
    [path]
  );

  return (
    <Typography
      variant="body1"
      sx={{
        userSelect: "none",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
    >
      {bc.backwards && (
        <IconButton sx={{ mr: "12px" }} size="small" onClick={() => nav(-1)}>
          <ArrowBackIosNewRoundedIcon fontSize="inherit" />
        </IconButton>
      )}

      <b>{t(bc.breadcrumb)}</b>
    </Typography>
  );
};

export default memo(Breadcrumb);
