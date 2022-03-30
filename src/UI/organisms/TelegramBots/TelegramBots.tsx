import { Box } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { telegramBotsConf } from "../../../configuration/telegramBots.conf";
import TelegramBotCard from "../../atoms/TelegramBotCard/TelegramBotCard";

export const TelegramBots = () => {
  const { t } = useTranslation("tgbots");
  const bots = useMemo(
    () =>
      telegramBotsConf.map((bot) => ({
        ...bot,
        title: t(bot.title),
        content: t(bot.content),
        sub: bot.sub ? t(bot.sub) : "",
        labelActive: t(bot.labelActive),
        labelDisabled: t(bot.labelDisabled),
      })),
    [t]
  );
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {bots.map((bot) => (
        <TelegramBotCard key={bot.title} {...bot} />
      ))}
    </Box>
  );
};
