import { Box, SxProps } from "@mui/material";
import { useMedia } from "lib/useMedia";
import { memo, useMemo } from "react";
import SalesCard from "UI/molecules/SalesCard/SalesCard";
import SalesCardSkeleton from "UI/molecules/SalesCard/SalesCardSkeleton";
import Carousel from "../Carousel/Carousel";

const SalesCardsConnected = ({
  data,
  isLoading,
}: ISalesCardsConnectedProps) => {
  const { isDesktop, IsDownThan1625, isTablet, isMobile } = useMedia();

  const sPv = useMemo(
    () =>
      isMobile ? 1 : isTablet ? 2 : !isDesktop ? 3 : IsDownThan1625 ? 4 : 6,
    [IsDownThan1625, isDesktop, isMobile, isTablet]
  );
  return (
    <Box sx={styles.root}>
      {!isLoading ? (
        <Carousel slidesPerView={sPv} spaceBetween={12} draggable loop>
          {data.map((sale) => (
            <SalesCard key={sale.title} {...sale} />
          ))}
        </Carousel>
      ) : (
        Array(sPv)
          .fill(0)
          .map((_, i) => <SalesCardSkeleton key={`scs-${i}`} />)
      )}
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    width: "100%",
    height: "160px",
    display: "flex",
    "&>*:not(:last-of-type)": {
      mr: "12px",
    },
  },
};

export default memo(SalesCardsConnected);
