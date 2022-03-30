type fullMPNames = "wildberries" | "ozon" | "yandexmarket";
type LiveNotifTypes = "orders" | "sales" | "returns" | "cancellation";

interface IGetLiveReq {
  mp: supportedMarketTypes[];
  d: timeStampTypes;
  type: LiveNotifTypes[];
  count: number;
}

interface IGetLiveRes {
  brand: string;
  created_at: string;
  date: string;
  marketplace: fullMPNames;
  name: string;
  nm_id: string;
  photo: string;
  total_price: number;
  type: LiveNotifTypes;
}

interface IGetLiveResTransformed extends Omit<IGetLiveRes, "marketplace"> {
  marketplace: supportedMarketTypes;
}

interface ITransformedLiveRes {
  data: IGetLiveResTransformed[];
  type: LiveNotifTypes;
}
