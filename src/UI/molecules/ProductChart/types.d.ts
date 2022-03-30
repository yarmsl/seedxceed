interface IProductChartProps {
  data: IProductGraphTransform[];
  isLoading: boolean;
}

interface ILineProductChart {
  datakey: keyof IProductGraphTransform;
  color: string;
}
