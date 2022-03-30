import { Box, IconButton, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReactComponent as telegramIcon } from "../../../assets/socials/telegram.svg";
import { ReactComponent as youtubeIcon } from "../../../assets/socials/youtube.svg";
import { ReactComponent as vkIcon } from "../../../assets/socials/vk.svg";

const socials = [
  { icon: telegramIcon, link: "https://t.me/robotorgovlia" },
  {
    icon: youtubeIcon,
    link: "https://www.youtube.com/channel/UCV1q9EkIBRzWRZN7jAbfimg/featured",
  },
  { icon: vkIcon, link: "https://vk.com/club211095910" },
];

const SocialNetworksCard = () => {
  const { t } = useTranslation("common");
  return (
    <Box sx={styles.root}>
      <Typography
        sx={{ fontSize: "20px", fontWeight: 500 }}
      >{t`inSocial`}</Typography>
      <Box sx={{ zIndex: 11 }}>
        {socials.map((social, i) => (
          <IconButton target="_blank" href={social.link} key={`social-${i}`}>
            <social.icon />
          </IconButton>
        ))}
      </Box>
      <Box sx={styles.c1} />
      <Box sx={styles.c2} />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    color: "#fff",
    minWidth: { xs: "100%", sm: "50%", md: "320px", lg: "400px" },
    maxWidth: { md: "300px", lg: "352px" },
    width: "100%",
    height: { xs: "200px", sm: "100%" },
    overflow: "hidden",
    position: "relative",
    p: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 1,
    bgcolor: "primary.main",
    userSelect: "none",
  },
  c1: {
    height: "138px",
    width: "138px",
    bgcolor: "primary.dark",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: "1rem",
    top: "6rem",
    zIndex: 5,
    opacity: "70%",
  },
  c2: {
    height: "138px",
    width: "138px",
    bgcolor: "primary.dark",
    opacity: 0.8,
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: "-4rem",
    top: "5rem",
    zIndex: 10,
  },
};

export default SocialNetworksCard;
