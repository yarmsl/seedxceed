interface ISalesLineChartAmountProps {
  data: IGraphAmount[];
  isLoading: boolean;
}
interface ISalesLineChartCountProps {
  data: IGraphCount[];
  isLoading: boolean;
}

interface ILineSaleAmount {
  datakey: keyof IGraphAmount;
  color: string;
}

interface ILineSaleCount {
  datakey: keyof IGraphCount;
  color: string;
}
