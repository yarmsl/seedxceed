import { memo, useMemo } from "react";
import { Box, SxProps } from "@mui/material";
import MarketCard from "UI/atoms/MarketCard/MarketCard";
import TotalRevenueCard from "UI/atoms/TotalRevenueCard/TotalRevenueCard";
import Carousel from "UI/molecules/Carousel/Carousel";
import { useMedia } from "lib/useMedia";
import SkeletonMarketCard from "./SkeletonMarketCard";
import { useSelector } from "react-redux";
import { isAtLeastOneLinkedShop } from "store/Dashboard";
import SocialNetworksCard from "UI/atoms/SocialNetworksCard/SocialNetworksCard";

const MarketCardsConnected = ({
  data,
  isLoading,
}: IMarketCardsConnectedProps): JSX.Element => {
  const cardsCount = useMemo(() => data.length, [data.length]);
  const total = useMemo(
    () =>
      Array.isArray(data)
        ? data.reduce((accu, curr) => accu + curr.marketSalesTotal, 0)
        : 0,
    [data]
  );
  const { isDesktop, isPortable, IsDownThan1625 } = useMedia();

  const sPv = useMemo(
    () =>
      cardsCount === 1
        ? 1
        : cardsCount > 2
        ? isPortable
          ? 1
          : !isDesktop
          ? 2
          : IsDownThan1625
          ? 3
          : cardsCount > 3
          ? 4
          : 3
        : isPortable
        ? 1
        : 2,
    [IsDownThan1625, cardsCount, isDesktop, isPortable]
  );
  const isLinkedMPs = useSelector(isAtLeastOneLinkedShop);

  return (
    <Box sx={styles.root}>
      {!isLoading ? (
        <>
          <Carousel
            slidesPerView={sPv}
            spaceBetween={12}
            draggable={cardsCount > 1}
            loop={cardsCount > 1}
            navigation={true}
          >
            {data.map((marketData, index) => (
              <MarketCard
                key={index}
                cardTotalSales={marketData.marketSalesTotal}
                marketName={marketData.marketName}
                marketIsActivated={marketData.isAddedByUser}
                marketGraphData={marketData.marketGraphData}
              />
            ))}
          </Carousel>
          {isLinkedMPs ? (
            <TotalRevenueCard summ={total} />
          ) : (
            <SocialNetworksCard />
          )}
        </>
      ) : (
        Array(sPv + 2)
          .fill(0)
          .map((_, i) => <SkeletonMarketCard key={`smc-${i}`} />)
      )}
    </Box>
  );
};

const arrow = {
  top: "100px",
  color: "white",
  "&:after": {
    fontSize: "24px",
    fontWeight: "bold",
    textShadow: "0px 0px 5px white",
  },
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: { xs: "auto", sm: "168px" },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    "&>*:not(:last-child)": {
      mr: { xs: "0px", sm: "12px" },
    },
    "& .swiper": {
      width: { xs: "100%", sm: "auto" },
      height: { xs: "200px", sm: "auto" },
      mb: { xs: "12px", sm: "0px" },
      "&-slide": {
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
      },
      "&-button": {
        "&-prev": arrow,
        "&-next": arrow,
      },
    },
  },
};

export default memo(MarketCardsConnected);
