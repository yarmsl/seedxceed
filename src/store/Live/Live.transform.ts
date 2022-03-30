const mpReducer = (marketplace: fullMPNames): supportedMarketTypes => {
  switch (marketplace) {
    case "wildberries":
      return "wb";
    case "ozon":
      return "oz";
    default:
      return "ym";
  }
};

export const LiveDataTransform = (data: IGetLiveRes[]) => {
  if (Array.isArray(data)) {
    const mpsData = data.map((d) => ({
      ...d,
      marketplace: mpReducer(d.marketplace),
    }));
    const filteredByType = (data: IGetLiveResTransformed[], type: LiveNotifTypes) => {
      const typedData = data.filter((d) => d.type === type);
      const dates = Array.from(
        new Set(
          [...typedData]
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((d) => d.created_at)
        )
      );
      return dates.map((date) => ({
        data: typedData.filter((l) => l.created_at === date),
        type,
      }));
    };

    const orders = filteredByType(mpsData, "orders");
    const sales = filteredByType(mpsData, "sales");
    const returns = filteredByType(mpsData, "returns");
    const calcels = filteredByType(mpsData, "cancellation");

    return [...orders, ...sales, ...returns, ...calcels].sort(
      (a, b) =>
        new Date(b.data[0].date).getTime() - new Date(a.data[0].date).getTime()
    );
  } else {
    return [];
  }
};
