interface ILinkedShopRes {
  client_id: string;
  company_title: string;
  id: number;
  key_code: string;
  key_code_full: string;
  market_place_title: supportedMarketTypes;
  md5_api_token: string;
  phone: string;
  shop_title: string;
  user_id: number;
}

interface IUpdateLinkShopReq {
  company_title: string;
  shop_title: string;
  phone: string;
  id: number;
}

interface ICreateLinkShopReq extends Omit<IUpdateLinkShopReq, "id"> {
  token: string;
  token2: string;
  client_id: string;
  marketplace_id: string;
}

interface IDeleteLinkShopReq {
  id: number;
}

interface productGraph {
  for_pay: number;
  orders_price: number;
}

interface topProductInfo {
  photo: string;
  name: string;
  count: number;
  nm_id: string;
  user_id: string;
  mp: supportedMarketTypes;
}

interface IDasboardData {
  top_5_products: topProductInfo[];
  graph: Record<string, productGraph>;
  sales_summary: number;
}

interface IGetDashboardAllResponce {
  exists: boolean;
  title: supportedMarketTypes;
  data?: IDasboardData;
}

interface IDashboardScreenProps {
  marketName: supportedMarketTypes;
  marketGraphData?: Record<string, productGraph>;
  marketSalesTotal: number;
  isAddedByUser: boolean;
  top5?: topProductInfo[];
}

interface IGetDashboardResponce {
  response: IDasboardData;
}

interface ILinkedShop {
  id: number;
  title: string;
  token: string;
  key: string;
  keyFull: string;
  mp: supportedMarketTypes;
  phone: string;
  clientId: string;
  shop_title: string;
}
interface IDashboardState {
  linkedShops: ILinkedShop[];
  dashboard: Record<supportedMarketTypes, IDasboardDataMP | null>;
}

interface graphData {
  date: string;
  wb_for_pay?: number;
  oz_for_pay?: number;
  ym_for_pay?: number;
  ml_for_pay?: number;
  wb_orders_price?: number;
  oz_orders_price?: number;
  ym_orders_price?: number;
  ml_orders_price?: number;
}

interface topSalesSelectorItem {
  photo: string;
  name: string;
  count: number;
  nm_id: string;
  user_id: string;
  mp: supportedMarketTypes;
}

interface IUiArgs {
  demo: boolean;
}
