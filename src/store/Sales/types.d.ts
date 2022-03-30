interface ISalesGeographyData {
  orders: Record<string, ISale>[];
  sales: Record<string, ISale>[];
}

interface IGetSalesGeographyRes {
  response: ISalesGeographyData;
}

interface ISale {
  count: number;
  percent: number;
  sum_price: number;
}

//getSales

interface IGetSalesRes {
  response: ISalesDataRes;
}

interface ISalesData {
  graphAmount: IGraphAmount[];
  graphCount: IGraphCount[];
  data: ISalesCardData[];
}

interface IGraphAmount extends IGraphCount {
  profit: number;
}

interface IGraphCount {
  date: string;
  sales: number;
  orders: number;
  refunds: number;
}

interface ISalesCardData {
  title: string;
  amountTitle: string;
  countTitle: string;
  amount: number;
  count: number;
  amountChange: number;
  countChange: number;
}

interface ISalesDataRes {
  graph: Record<string, ISalesDataGraph>;
  logistics: ISalesDataLogistics;
  logistics_changes: ISalesDataLogistics;
  orders: ISalesDataOrders;
  orders_changes: ISalesDataOrders;
  profit_and_commissions: ISalesDataProfit;
  profit_and_commissions_changes: ISalesDataProfit;
  returns: ISalesDataReturns;
  returns_changes: ISalesDataReturns;
  sales: ISalesDataSales;
  sales_changes: ISalesDataSales;
  stocks_price: ISalesDataStocks;
  stocks_price_changes: ISalesDataStocks;
}

interface ISalesDataGraph {
  logistics_from_client: number;
  logistics_to_client: number;
  orders_count: number;
  orders_price: number;
  profit_price: number;
  returns_count: number;
  returns_price: number;
  sales_commission: number;
  sales_count: number;
  sales_for_pay: number;
  sales_price: number;
  sales_self_price: number;
}

interface ISalesDataLogistics {
  from_client_price: number;
  to_client_price: number;
}

interface ISalesDataOrders {
  orders_count: number;
  orders_price: number;
}

interface ISalesDataProfit {
  commission_marketplace: number;
  profit_price: number;
}

interface ISalesDataReturns {
  returns_count: number;
  returns_price: number;
}

interface ISalesDataSales {
  sales_count: number;
  sales_price: number;
}

interface ISalesDataStocks {
  stocks_price: number;
  stocks_self_price: number;
}

type ISalesDynamicsReq = Omit<IApiReq, "user_id" | "m" | "lang"> & {
  nm_id: string[];
};

interface ISalesDynamicsRes {
  brands: Record<string, IBrandData[]>[];
  graph: Record<DaysType, IHoursData>;
}

interface ISalesDynamicsTransformedRes {
  brands: IBrandsTransformedData[];
  graph: IHoursDataTransformed[];
}

interface IBrandData {
  all_count: number;
  all_price: number;
  date: string;
  brand: string;
}

interface IBrandsTransformedData {
  brand: string;
  graph: IBrandData[];
}

type DaysType = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

interface IHoursData {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
  20: number;
  21: number;
  22: number;
  23: number;
  sum_count: number;
}

interface IHoursDataTransformed extends IHoursData {
  day: DaysType;
}


interface IBrandTableData {
  all_count: number;
  all_price: number;
  date: string;
  brand: string;

}

//getBrands

interface IBrandsRes {
  response: BrandDataBody;
}

type BrandDataBody = Record<string, IBrandData>;

interface IBrandData {
  graph: Record<string, IBrandsGraphData>;
  orders_price: number;
  orders_price_changes: number;
  summary: IBrandsSummaryData;
  top_5_products: IBrandsTop5Data[];
}

interface IBrandsGraphData {
  orders_price: number;
  sales_price: number;
}

interface IBrandsSummaryData {
  days_on_sale: number;
  orders: number;
  products_count: number;
  returns: number;
  sales: number;
}

interface IBrandsTop5Data {
  count: number;
  name: string;
  photo: string;
}
