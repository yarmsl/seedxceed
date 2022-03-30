import { createSelector } from "@reduxjs/toolkit";
import { marketPlaceConf } from "configuration/marketPlace.conf";
import { selectedMpsSelector } from "store/UI";
import { TRootState } from "..";

export const dashboardSelector = (state: TRootState): IDashboardState =>
  state.dashboard;

export const linkedShopsSelector = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.linkedShops
);

export const dashboardMpsSelector = createSelector(
  dashboardSelector,
  (dashboard) => dashboard.dashboard
);

export const linkedMPSelector = createSelector(linkedShopsSelector, (shops) =>
  shops.reduce(
    (accu: supportedMarketTypes[], curr) =>
      accu.includes(curr.mp) ? accu : accu.concat(curr.mp),
    []
  )
);

export const isAtLeastOneLinkedShop = createSelector(
  linkedMPSelector,
  (shops) => shops.length > 0
);

export const labeledLinkedMPSelector = createSelector(linkedMPSelector, (mps) =>
  marketPlaceConf.filter((mp) => mps.includes(mp.mp))
);

export const linkedShopsWithMpColorAndIconSelector = createSelector(
  linkedShopsSelector,
  (shops) =>
    shops.map((shop) => {
      const mp = marketPlaceConf.find((mp) => mp.mp === shop.mp);
      return {
        ...shop,
        icon: mp?.icon || "",
        color: mp?.color || "#fff",
        SvgIcon: mp?.SvgIcon,
        SvgLogo: mp?.SvgLogo,
      };
    })
);

export const shopsSelector = createSelector(
  linkedShopsWithMpColorAndIconSelector,
  selectedMpsSelector,
  (shops, mps) => shops.filter((shop) => mps.includes(shop.mp))
);

export const tokensSelector = createSelector(
  linkedShopsSelector,
  selectedMpsSelector,
  (shops, mps) =>
    shops.filter((shop) => mps.includes(shop.mp)).map((shop) => shop.token)
);

export const isTokensConsistMp = createSelector(
  linkedShopsSelector,
  (shops) => (mp: supportedMarketTypes, tokens: string[]) =>
    !tokens
      .map((token) => shops.find((shop) => shop.token === token)?.mp === mp)
      .includes(false)
);

export const shopsByMPSelector = createSelector(
  linkedShopsSelector,
  (shops) => (mps: supportedMarketTypes[]) =>
    shops.filter((shop) => mps.includes(shop.mp))
);

export const tokensByMPSelector = createSelector(
  shopsByMPSelector,
  (shops) => (mps: supportedMarketTypes[]) =>
    shops(mps).map((shop) => shop.token)
);

export const selectedMpsTotalRevenueSelector = createSelector(
  dashboardMpsSelector,
  selectedMpsSelector,
  (dashboard, mps) =>
    mps
      .map((mp) => (dashboard[mp] != null ? dashboard[mp].sales_summary : 0))
      .reduce((accu: number, curr) => accu + curr, 0)
);

export const dashboardGraphDataSelector = createSelector(
  dashboardMpsSelector,
  selectedMpsSelector,
  (dashboard, mps): graphData[] =>
    mps
      .map((mp) =>
        dashboard[mp] != null
          ? Object.keys(dashboard[mp]?.graph || []).map((date) => ({
              date: date,
              [`${mp}_for_pay`]: dashboard[mp]?.graph[date].for_pay,
              [`${mp}_orders_price`]: dashboard[mp]?.graph[date].orders_price,
            }))
          : []
      )
      .flat()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .reduce((accu: graphData[], curr) => {
        const found = accu.find((a) => a.date === curr.date);
        if (found) {
          accu.pop();
          accu.push(Object.assign({}, found, curr));
        } else {
          accu.push(curr);
        }
        return accu;
      }, [])
      .map((data) => ({
        ...data,
        date: new Date(data.date).toLocaleDateString(),
      }))
);

export const topSalesSelector = createSelector(
  dashboardMpsSelector,
  selectedMpsSelector,
  (dashboard, mps) => {
    let topSales: topSalesSelectorItem[] = [];

    const sort = (a: topSalesSelectorItem, b: topSalesSelectorItem) => {
      return b.count - a.count;
    };

    mps.forEach((item) => {
      topSales = topSales.concat(
        dashboard[item]?.top_5_products.map(
          (itemTop: Omit<topProductInfo, "mp">) => {
            return { ...itemTop, mp: item };
          }
        )
      );
    });
    return topSales.sort(sort).slice(0, 5);
  }
);
