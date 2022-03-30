interface ITopSalesProps {
  data?: ITopSalesItem[];
}

interface ITopSalesItem {
  photo: string;
  name: string;
  count: number;
  nm_id: string;
  user_id: string;
  mp: supportedMarketTypes;
}