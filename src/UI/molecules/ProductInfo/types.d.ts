interface IProductInfoProps {
  data?: IProductFullTransformRes;
}

interface IProductInfoItemProps {
  title: string;
  value?: string | number;
}

interface IProductInfoCol {
  title: string;
  ad: string;
  key: keyof IProduct;
}
