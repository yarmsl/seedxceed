interface IMarketCardProps {
  marketName: supportedMarketTypes;
  cardTotalSales: number;
  marketIsActivated: boolean;
  marketGraphData?: Record<string, productGraph>;
}
