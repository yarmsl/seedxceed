import { memo, ReactNode } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

type ICarouselProps = Omit<SwiperProps, "modules"> & {
  children: ReactNode[];
};

const Carousel = ({ children, ...rest }: ICarouselProps): JSX.Element => {
  return (
    <Swiper modules={[Navigation]} {...rest}>
      {children?.map((slide, i) => {
        return <SwiperSlide key={`slide-${i}`}>{slide}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default memo(Carousel);
