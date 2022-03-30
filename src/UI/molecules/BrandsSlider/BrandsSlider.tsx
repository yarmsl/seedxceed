import {memo, useState, useEffect} from 'react';
import {Box, SxProps} from "@mui/material"
import SwiperCore, {Navigation, Mousewheel} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import BrandSlide from "../../atoms/BrandSlide/BrandSlide"
import { useMedia } from "lib/useMedia";

import "swiper/css";
import "swiper/css/navigation";

const BrandsSlider = ({data, activeBrand, changeActiveBrand, swiperIndex, changeIndex}: IBrandsSliderProps) => {


  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const { isTablet, isMobile } = useMedia();

  const changeSlide = (idx: number) => {
    changeIndex(idx)
    swiper?.slideTo(idx)
    changeActiveBrand(data[idx].brand)
  }

  useEffect(() => {
    swiper?.slideTo(swiperIndex)
    changeActiveBrand(data[swiperIndex]?.brand)
  }, [data, swiper, swiperIndex, changeActiveBrand])

  return (
    <Box sx={styles.wrap}>
      <Swiper
        slidesPerView={isMobile ? 1 : isTablet ? 3 : 4}
        spaceBetween={10}
        modules={[Navigation, Mousewheel]}
        mousewheel
        className="carousel"
        navigation={true}
        initialSlide={swiperIndex}
        onClick={(sl) => changeSlide(sl.clickedIndex)}
        onActiveIndexChange={(sl) => changeSlide(sl.activeIndex)}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {
          data.map((item, idx) => {
            return (
              <SwiperSlide key={`slide_${idx+1}`}>
                <BrandSlide
                  activeBrand={activeBrand}
                  brand={item.brand}
                  ordersPrice={item.orders_price}
                  ordersPriceChanges={item.orders_price_changes}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </Box>
  );
};

const styles: Record<string, SxProps> = {
  wrap: {
    "& .swiper-slide": {
      borderRadius: "12px",
      height: "170px",
      position: "relative",
      cursor: "pointer",
      overflow: "hidden"
    },
    "& .swiper-button-next, .swiper-button-prev": {
      top: "85%",
      "&::after": {
        fontSize: "22px!important"
      }
    }
  }
}

export default memo(BrandsSlider);