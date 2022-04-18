interface IBrandsAreaChartProps {
  isLoading: boolean;
  graphData: IHoursDataTransformed[];
}

interface ITableWeekProps {
  isLoading: boolean;
  graphData: IHoursDataTransformed[];
}

interface IBrandsTableProps {
  isLoading: boolean;
  brandsData: IBrandsTransformedData[];
}

interface ITableWeekColunms {
  id: keyof IHoursDataTransformed;
  title: string;
  format?: (
    value: string | number,
    maxSum: string | number
  ) => JSX.Element | string | number;
}

interface ITableBrandsColunms {
  id: keyof IBrandTableData;
  title: string;
  format?: (value: string | number) => JSX.Element | string | number;
}
