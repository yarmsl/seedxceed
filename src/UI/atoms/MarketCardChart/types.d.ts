interface IMarketCardChartProps {
  data?: Record<string, productGraph>;
}

interface IChartPayload {
  date: string;
  op: number;
}

interface IPayload {
  payload: IChartPayload;
}

interface IChartTooltipProps {
  active?: boolean;
  payload?: IPayload[];
  label?: string;
}
