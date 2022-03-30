import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, SxProps, Typography, Link, Button } from "@mui/material";
import Step from "../../atoms/Step/Step";
import SupportWindow from "../SupportWindow/SupportWindow";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/downloadIcon.svg";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import YouTubeBox from "UI/atoms/YouTubeBox/YouTubeBox";
import { useMedia } from "lib/useMedia";
import { LANG } from "configuration/baseUrls";

const InstructionConnectMarket = ({
  marketName,
}: IInstructionConnectMarket): JSX.Element => {
  const Logo = useMemo(
    () => marketPlaceConf.find((conf) => conf.mp === marketName)?.SvgLogo,
    [marketName]
  );
  const { t } = useTranslation("apiConnection");
  const { isDesktop, isMobile } = useMedia();

  const marketsInstruction = useMemo(
    () => ({
      wb: {
        background: "#7209B7",
        descr: `${t`wbSubtitle`}`,
        linkTutorial:
          "https://testrobotorg.seed-x-ceed.com/static/media/98330fe3-733e-4bbd-93a2-2e8ba8199cbd.pdf",
        tutorial: [
          <>
            {t`wbHowTo1`}
            <Button
              sx={{ ml: "12px" }}
              variant="contained"
              href={t`wbHowTo1Link`}
              target="_blank"
            >
              {t`wbHowToBtnText`}
            </Button>
          </>,
          <>{t`wbHowTo2`}</>,
          <>
            {t`wbHowTo3`}
            {""}
            <Button
              sx={{ ml: "12px" }}
              variant="contained"
              href={t`wbHowTo1Link`}
              target="_blank"
            >
              {t`wbHowToBtnText2`}
            </Button>
          </>,
          <>{t`wbHowTo4`}</>,
          <>{t`wbHowTo5`}</>,
        ],
      },
      oz: {
        background: "#3F37C9",
        descr: `${t`ozonSubtitle`}`,
        linkTutorial:
          "https://testrobotorg.seed-x-ceed.com/static/media/31a7d819-01fd-49f7-8cae-fc4e5f691cc0.pdf",
        tutorial: [
          <>{t`ozonHowTo1`}</>,
          <>{t`ozonHowTo2`}</>,
          <>{t`ozonHowTo3`}</>,
          <>{t`ozonHowTo4`}</>,
        ],
      },
      ym: {
        background: "#FFC107",
        descr: `${t`ymSubtitle`}`,
        linkTutorial:
          "https://testrobotorg.seed-x-ceed.com/static/media/01a0b289-6be7-4d85-b63b-68633b621011.pdf",
        tutorial: [
          <>{t`ymHowTo1`}</>,
          <>
            {t`ymHowTo2a`}{" "}
            <Box component={"span"} >
            <Button
              sx={{ ml: "12px" }}
              variant="contained"
              href={t`ymHowTo3Link`}
              target="_blank"
            >
              {t`ymHowTo2b`}
            </Button>
            </Box>{" "}
            {t`ymHowTo2c`}
          </>,
          <>
            {t`ymHowTo3a`} {t`ymHowTo3b`}, {t`ymHowTo3c`}
          </>,
          <>{t`ymHowTo4`}</>,
        ],
      },
      ml: {
        background: "#FFE57F",
        descr: `${t`mlSubtitle`}`,
        linkTutorial: "#",
        tutorial: [
          <>{t`mlHowTo1`}</>,
          <>
            {t`mlHowTo2a`}{" "}
            <Box component={"span"} sx={styles.stepBtn}>
              <Typography
                component={"span"}
                sx={styles.textBtn}
              >{t`mlHowTo2b`}</Typography>
            </Box>{" "}
            {t`mlHowTo2c`}
          </>,
          <>{t`mlHowTo3`}</>,
          <>{t`mlHowTo4`}</>,
        ],
      },
    }),
    [t]
  );

  return (
    <Box sx={styles.wrap}>
      {marketName === "tutorial" ? (
        LANG === "ru" && (
          <Box sx={styles.tutorial}>
            <YouTubeBox embedId="zXVDeC9hBAo" />
            {isDesktop && (
              <Box sx={styles.support}>
                <SupportWindow />
              </Box>
            )}
          </Box>
        )
      ) : (
        <Box
          sx={{
            backgroundColor: marketsInstruction[marketName].background,
            height: "100%",
            width: "100%",
            p: "25px",
            borderRadius: "12px",
          }}
        >
          <Box sx={styles.label}>{Logo && <Logo />}</Box>
          <Link
            sx={styles.btnTutorial}
            href={marketsInstruction[marketName].linkTutorial}
            target="_blank"
          >
            <DownloadIcon />
            {!isMobile && (
              <Typography
                sx={styles.textBtnTutorial}
              >{t`sbsInstruction`}</Typography>
            )}
          </Link>
          <Typography sx={styles.descr}>
            {marketsInstruction[marketName].descr}
          </Typography>
          {marketsInstruction[marketName].tutorial.map(
            (item: JSX.Element, idx) => {
              return (
                <Step key={`step_${idx + 1}`} number={idx + 1}>
                  {item}
                </Step>
              );
            }
          )}
        </Box>
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    width: { xs: "100%", md: "calc(100% - 316px)" },
    minHeight: { xs: "275px", sm: "360px", md: "100%" },
    borderRadius: "12px",
    position: "relative",
  },
  label: {
    mb: "15px",
    "& > svg": {
      height: "20px",
      maxHeight: "20px",
    },
  },
  descr: {
    mb: "15px",
    color: "#fff",
    maxWidth: "600px",
  },
  stepBtn: {
    backgroundColor: "#2196F3",
    p: "12px 15px",
    display: "inline-block",
    borderRadius: "4px",
    m: "0 10px",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
  },
  textBtn: {
    color: "#fff",
    fontSize: "14px",
  },
  btnTutorial: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
    backgroundColor: "#fff",
    p: { xs: "4px", sm: "8px 16px" },
    borderRadius: { xs: "50%", sm: "4px" },
    display: "flex",
    alignItems: "center",
    "& > svg": {
      mr: { xs: "0px", sm: "15px" },
    },
  },
  textBtnTutorial: {
    color: "#1565C0",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
  },
  tutorial: {
    width: "100%",
    height: { xs: "255px", sm: "360px", md: "100%" },
    display: "flex",
    "&>*:not(:last-of-type)": {
      mr: { xs: "12px", md: "16px" },
    },
  },
  support: {
    width: "325px",
  },
};

export default memo(InstructionConnectMarket);
