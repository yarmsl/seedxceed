import { Paper } from "@mui/material";
import { TelegramBots } from "../../UI/organisms/TelegramBots";
import HelmetTitle from "../../UI/atoms/Helmet";
import { memo } from "react";

const TelegramBotsPage = () => {
  return (
    <>
      <HelmetTitle title="telegramBots" />
      <Paper sx={{ flexGrow: 1, width: "100%", height: "100%", p: "6px" }}>
        <TelegramBots />
      </Paper>
    </>
  );
};

export default memo(TelegramBotsPage);
