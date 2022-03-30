type INewCardFormFields = {
  barcode: string;
  brand: string;
  country: string;
  depth: string;
  height: string;
  old_price?: string;
  premium_price?: string;
  price: string;
  weight: string;
  width: string;
  shops: ISelectShopField[];
  title: string;
  price: string;
  oz_category?: ICategoryOzRes | null;
  wb_category?: ICategoryRes | null;
  images: Files[];
  videos: Files[];
  stereos: Files[];
  vat: TVat;
  oz?: Record<string, ISpecsOzRes | ISpecsOzRes[] | string | undefined>;
};