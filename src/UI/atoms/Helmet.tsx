import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store";
interface IHelmetProps {
  title: string;
  needNoTranslation?: boolean;
}

const HelmetTitle = ({
  title,
  needNoTranslation,
}: IHelmetProps): JSX.Element => {
  const { t } = useTranslation("menu");
  const { darkMode, locale } = useAppSelector((st) => st.ui);
  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{`SeedXceed | ${needNoTranslation ? title : t(title)}`}</title>
      <meta
        name="theme-color"
        content={darkMode ? "#111936" : "#ffffff"}
      ></meta>
    </Helmet>
  );
};

export default memo(HelmetTitle);
