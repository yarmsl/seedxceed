const mpReducer = (marketplace: fullMPNames): supportedMarketTypes => {
  switch (marketplace) {
    case "wildberries":
      return "wb";
    case "ozon":
      return "oz";
    case "yandex_market":
      return "ym";
    default:
      return "ym";
  }
};

export const LiveDataTransform = (data: IGetLiveRes[]) =>
  Array.isArray(data)
    ? data.map((d) => ({
        ...d,
        marketplace: mpReducer(d.marketplace),
      }))
    : [];
