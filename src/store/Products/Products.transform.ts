export const getProductByIdTransformResponse = (data: IProductFull) => {
  return {
    ...data,
    graphData: Object.keys(data.graph)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((key) => ({
        date: new Date(key).toLocaleDateString(),
        sales: data.graph[key].sales_price,
        price: data.graph[key].average_price,
        discount: data.graph[key].average_discount,
        refunds: data.graph[key].returns_price,
      })),
    cardsData: [
      {
        title: "sales",
        amountTitle: "amount",
        countTitle: "quantity",
        amount: data.sales_price,
        count: data.sales,
        amountChange: data.sales_changes.sales_price,
        countChange: data.sales_changes.sales_count,
      },
      {
        title: "orders",
        amountTitle: "amount",
        countTitle: "quantity",
        amount: data.orders_price,
        count: data.orders,
        amountChange: data.orders_changes.orders_price,
        countChange: data.orders_changes.orders_count,
      },
      {
        title: "refunds",
        amountTitle: "amount",
        countTitle: "quantity",
        amount: data.returns_price,
        count: data.returns,
        amountChange: data.returns_changes.returns_price,
        countChange: data.returns_changes.returns_count,
      },
      {
        title: "shipping",
        amountTitle: "toClient",
        countTitle: "fromClient",
        amount: data.logistics_to_client,
        count: data.logistics_from_client,
        amountChange: data.logistics_changes.to_client_price,
        countChange: data.logistics_changes.from_client_price,
      },
      {
        title: "profitComm",
        amountTitle: "profit",
        countTitle: "mpComm",
        amount: data.profit_price,
        count: data.commission_price,
        amountChange: data.profit_and_commissions_changes.profit_price,
        countChange: data.profit_and_commissions_changes.commission_marketplace,
      },
      {
        title: "whCapital",
        amountTitle: "retailPrice",
        countTitle: "cost",
        amount: data.stocks_price,
        count: data.stocks_self_price,
        amountChange: data.stocks_price_changes.stocks_price,
        countChange: data.stocks_price_changes.stocks_self_price,
      },
    ],
  };
};
