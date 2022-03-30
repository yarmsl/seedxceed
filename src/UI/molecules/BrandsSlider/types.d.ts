interface IBrandsSliderProps {
  data: IBrandsState[];
  activeBrand: string;
  swiperIndex: number;
  changeActiveBrand(brand: string): void;
  changeIndex(idx: number): void;
}