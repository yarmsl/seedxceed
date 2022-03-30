import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from "@mui/material";
import { flagUrl } from "lib/helpers";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store";
import { setLocale } from "store/UI";
import LangMenu from "./LangMenu";

const items: ILangObj[] = [
  { icon: "GB", title: "English (En)", lang: "en" },
  { icon: "BR", title: "Português (Pt)", lang: "pt" },
];

const LangSwitcher = () => {
  const dispatch = useAppDispatch();
  const { locale } = useAppSelector((st) => st.ui);
  const { i18n } = useTranslation();

  const changeLang = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      dispatch(setLocale(lang));
    },
    [dispatch, i18n]
  );
  const [anchor, setAnchor] = useState<null | HTMLDivElement>(null);
  const handleOpen = useCallback(
    (event: MouseEvent<HTMLDivElement>) => setAnchor(event.currentTarget),
    []
  );
  const handleClose = useCallback(() => setAnchor(null), []);

  const flagCode = useMemo(
    () => items.find((item) => item.lang === locale)?.icon || "BR",
    [locale]
  );
  const title = useMemo(
    () => items.find((item) => item.lang === locale)?.title || "Português (Pt)",
    [locale]
  );
  return (
    <>
      <ListItemButton onClick={handleOpen} sx={styles.root} disableGutters>
        <ListItemIcon sx={styles.icon}>
          <img src={flagUrl(flagCode)} alt={locale} />
        </ListItemIcon>
        <ListItemText sx={{ ml: "28px" }}>{title}</ListItemText>
      </ListItemButton>
      <LangMenu
        anchor={anchor}
        handleClose={handleClose}
        handleLang={changeLang}
        items={items}
      />
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    m: "6px 0",
    p: "5px 10px 5px 5px",
    borderRadius: 1,
    whiteSpace: "nowrap",
    color: "common.black",
  },
  icon: {
    width: "34px",
    height: "34px",
    minWidth: "34px",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: 3,
    "& img": {
      width: "100%",
      height: "100%",
      maxWidth: "34px",
      maxHeight: "34px",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
};

export default LangSwitcher;
