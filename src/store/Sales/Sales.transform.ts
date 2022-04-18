import { date } from "lib/helpers";
import { LANG } from "../../configuration/baseUrls";

const langData = () => (LANG === "pt" ? "pt-BR" : LANG);

export const getSalesTransformResponse = ({
  response: data,
}: IGetSalesRes): ISalesData => {
  return {
    graphAmount:
      data != null
        ? Object.keys(data.graph)
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
            .map((key) => ({
              date: new Date(key).toLocaleDateString(langData()),
              sales: data.graph[key].sales_price,
              orders: data.graph[key].orders_price,
              profit: data.graph[key].profit_price,
              refunds: data.graph[key].returns_price,
            }))
        : [],
    graphCount:
      data != null
        ? Object.keys(data.graph)
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
            .map((key) => ({
              date: new Date(key).toLocaleDateString(langData()),
              sales: data.graph[key].sales_count,
              orders: data.graph[key].orders_count,
              refunds: data.graph[key].returns_count,
            }))
        : [],
    data:
      data != null
        ? [
            {
              title: "sales",
              amountTitle: "amount",
              countTitle: "quantity",
              amount: data.sales.sales_price,
              count: data.sales.sales_count,
              amountChange: data.sales_changes.sales_price,
              countChange: data.sales_changes.sales_count,
            },
            {
              title: "orders",
              amountTitle: "amount",
              countTitle: "quantity",
              amount: data.orders.orders_price,
              count: data.orders.orders_count,
              amountChange: data.orders_changes.orders_price,
              countChange: data.orders_changes.orders_count,
            },
            {
              title: "refunds",
              amountTitle: "amount",
              countTitle: "quantity",
              amount: data.returns.returns_price,
              count: data.returns.returns_count,
              amountChange: data.returns_changes.returns_price,
              countChange: data.returns_changes.returns_count,
            },
            {
              title: "shipping",
              amountTitle: "toClient",
              countTitle: "fromClient",
              amount: data.logistics.to_client_price,
              count: data.logistics.from_client_price,
              amountChange: data.logistics_changes.to_client_price,
              countChange: data.logistics_changes.from_client_price,
            },
            {
              title: "profitComm",
              amountTitle: "profit",
              countTitle: "mpComm",
              amount: data.profit_and_commissions.profit_price,
              count: data.profit_and_commissions.commission_marketplace,
              amountChange: data.profit_and_commissions_changes.profit_price,
              countChange:
                data.profit_and_commissions_changes.commission_marketplace,
            },
            {
              title: "whCapital",
              amountTitle: "retailPrice",
              countTitle: "cost",
              amount: data.stocks_price.stocks_price,
              count: data.stocks_price.stocks_self_price,
              amountChange: data.stocks_price_changes.stocks_price,
              countChange: data.stocks_price_changes.stocks_self_price,
            },
          ]
        : [],
  };
};

export const getSalesDynamicsTransformResponse = (
  data: ISalesDynamicsRes
): ISalesDynamicsTransformedRes => {
  const days: DaysType[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return {
    brands:
      Array.isArray(data.brands) && data.brands.length > 0
        ? Object.keys(data.brands[0]).map((key) => ({
            brand: key,
            graph: data.brands[0][key].map((g) => ({
              ...g,
              date: date(g.date),
            })),
          }))
        : [],
    graph:
      data.graph.mon != null
        ? days.map((day) => ({
            day: day,
            ...data.graph[day],
          }))
        : [],
  };
};

export const getSalesBrands = (
  data: IBrandsRes,
  mp: supportedMarketTypes
): IBrandsState[] => {
  return data.response != null
    ? Object.keys(data.response)
        .map((brand) => ({ ...data.response[brand], brand }))
        .map((item) => {
          return {
            ...item,
            top_5_products: item.top_5_products.map((item) => ({
              ...item,
              mp,
            })),
          };
        })
    : [];
};
