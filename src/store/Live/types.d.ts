interface ILiveState {
  livesCount: number;
  ordersPage: number;
  ordersRows: number;
}

type fullMPNames = "wildberries" | "ozon" | "yandex_market";
type LiveNotifTypes = "orders" | "sales" | "returns" | "cancellation";

interface IGetLiveReq {
  mp: supportedMarketTypes[];
  type: LiveNotifTypes[];
  count: number;
}

interface IGetLiveRes {
  brand: string;
  created_at: string;
  date: string;
  income_id: string;
  marketplace: fullMPNames;
  name: string;
  nm_id: string;
  photo: string;
  total_price: number;
  type: LiveNotifTypes;
  user_id: string;
}

interface IGetLiveResTransformed extends Omit<IGetLiveRes, "marketplace"> {
  marketplace: supportedMarketTypes;
}

interface ITransformedLiveRes {
  data: IGetLiveResTransformed[];
  type: LiveNotifTypes;
}

interface IGetBarcodeReq {
  income_id: string;
  marketplace: supportedMarketTypes;
  user_id: string;
}
