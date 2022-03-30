import { memo, useState } from "react";
import { Box, SxProps } from "@mui/material";
import ListMarketsTutorial from "../ListMarketsTutorial/ListMarketsTutorial";
import InstructionConnectMarket from "../InstructionConnectMarket/InstructionConnectMarket";
import { LANG } from "configuration/baseUrls";

const MarketConnectTutorial = (): JSX.Element => {
  const [activeMarket, setActiveMarket] = useState<tutorialsMarketTypes>(
    LANG === "ru" ? "tutorial" : "ml"
  );

  return (
    <Box sx={styles.wrap}>
      <ListMarketsTutorial
        activeMarket={activeMarket}
        changeActiveMarket={(item: tutorialsMarketTypes) =>
          setActiveMarket(item)
        }
      />
      <InstructionConnectMarket marketName={activeMarket} />
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    height: { xs: "auto", md: "475px" },
    "&>*:not(:last-of-type)": {
      mr: { xs: "0px", md: "16px" },
      mb: { xs: "12px", md: "0px" },
    },
  },
};

export default memo(MarketConnectTutorial);
