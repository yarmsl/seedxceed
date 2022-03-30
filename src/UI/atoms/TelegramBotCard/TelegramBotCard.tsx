import { memo } from "react";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { ReactComponent as TelegramIcon } from "../../../assets/telegramBots/telegram.svg";

const TelegramBotCard = ({
  Icon,
  title,
  content,
  sub,
  active,
  labelActive,
  labelDisabled,
  link,
}: ITelegramBotCardProps) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.icon}>
        <Icon />
      </Box>
      <Box sx={styles.content}>
        <Typography sx={styles.title} variant="h6">
          {title}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        {sub && <Typography variant="body2">({sub})</Typography>}
      </Box>
      <Button
        href={link}
        disabled={!active}
        startIcon={<TelegramIcon />}
        variant="outlined"
        fullWidth
      >
        {active ? labelActive : labelDisabled}
      </Button>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: { xs: "calc(100% - 12px)", sm: "400px" },
    height: { xs: "300px", sm: "275px" },
    boxSizing: "border-box",
    p: "12px",
    m: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    bgcolor: "background.default",
    borderRadius: 1,
  },
  icon: {
    width: "72px",
    "& svg": {
      width: "100%",
    },
  },
  content: {
    flexGrow: 1,
  },
  title: {
    p: "12px 0",
  },
};

export default memo(TelegramBotCard);
