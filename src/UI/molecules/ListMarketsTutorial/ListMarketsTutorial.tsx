import { memo, useCallback, useState, useMemo, useEffect } from "react";
import { Box, SxProps } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import TutorialCard from "../../atoms/TutorialCard/TutorialCard";
import { useMedia } from "lib/useMedia";
import "swiper/css";
import SwiperCore from "swiper";
import { LANG } from "configuration/baseUrls";
const markets: supportedMarketTypes[] = ["oz", "ml", "wb", "ym"];
const slides = ["tutorial", "oz", "ml", "wb", "ym"];

const ListMarketsTutorial = ({
  activeMarket,
  changeActiveMarket,
}: IListMarketsTutorial): JSX.Element => {
  const { isTablet, isMobile, isPortable } = useMedia();
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  const filteredMarkets = useMemo(
    () =>
      LANG === "ru"
        ? markets.filter((mp) => mp !== "ml")
        : markets.filter((mp) => !(mp === "oz" || mp === "wb" || mp === "ym")),
    []
  );
  const filteredSlides = useMemo(
    () =>
      LANG === "ru"
        ? slides.filter((mp) => mp !== "ml")
        : slides.filter(
            (mp) =>
              !(mp === "oz" || mp === "wb" || mp === "ym" || mp === "tutorial")
          ),
    []
  );

  const toSlide = useCallback(
    (index: number) => swiper?.slideTo(index),
    [swiper]
  );

  const handleSlideChange = useCallback(
    (idx: number) => {
      if (isMobile) {
        setSwiperIndex(idx);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (isMobile) {
      changeActiveMarket(filteredSlides[swiperIndex]);
    }
  }, [changeActiveMarket, filteredSlides, isMobile, swiperIndex]);

  useEffect(() => {
    if (isMobile) {
      toSlide(1);
    }
  }, [isMobile, toSlide]);

  return (
    <Box sx={styles.root}>
      <Swiper
        loop={isPortable ? true : false}
        spaceBetween={0}
        slidesPerView={isMobile ? 1 : isTablet ? 3 : 4}
        direction={isPortable ? "horizontal" : "vertical"}
        onSlideChange={(sl) => handleSlideChange(sl.realIndex)}
        initialSlide={swiperIndex}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {LANG === "ru" && (
          <SwiperSlide>
            <TutorialCard
              marketName="tutorial"
              selected={activeMarket === "tutorial"}
              action={() => changeActiveMarket("tutorial")}
            />
          </SwiperSlide>
        )}
        {filteredMarkets.map((item, idx) => {
          return (
            <SwiperSlide key={`market_${idx}`}>
              <TutorialCard
                marketName={item}
                selected={activeMarket === item}
                action={() => changeActiveMarket(item)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  root: {
    display: "flex",
    width: { xs: "100%", md: "300px" },
    height: { xs: "112px", md: "100%" },

    "& .swiper": {
      width: "100%",
      "&-wrapper": {
        width: "100%",
        p: "12px 0",
      },
      "&-slide": {
        width: "100%",
        display: "flex",
        justifyContent: "center",
      },
    },
  },
};

export default memo(ListMarketsTutorial);
