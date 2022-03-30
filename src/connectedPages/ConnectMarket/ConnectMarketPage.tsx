import { Paper, SxProps } from "@mui/material";
import Helmet from "UI/atoms/Helmet";
import { ConnectMarket } from "../../UI/organisms/ConnectMarket/ConnectMarket";
import { FormMarketCard } from "../../UI/atoms/FormMarketCard/FormMarketCard";
import { memo } from "react";

const ConnectMarketPage = () => {
  return (
    <>
      <Helmet title="connectMarket" />
      <Paper sx={styles.root}>
        <ConnectMarket />
        <FormMarketCard />
      </Paper>
    </>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    "&>*:not(:last-of-type)": {
      mb: { xs: "12px", md: "24px" },
    },
  },
};

export default memo(ConnectMarketPage);
