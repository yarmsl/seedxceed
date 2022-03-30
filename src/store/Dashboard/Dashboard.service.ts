import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA_API_URL, LANG } from "../../configuration/baseUrls";

export const dashboardAPI = createApi({
  reducerPath: "dashboardAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${DATA_API_URL}/api`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Dashboard"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getLinkedShops: build.query<ILinkedShop[], string>({
      query: () => ({
        url: "/org_api/getApiMarketPlace",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
      transformResponse: (data: ILinkedShopRes[], _, arg) =>
        (
          data?.map((shop) => ({
            id: shop.id,
            title: shop.company_title,
            shop_title: shop.shop_title,
            token: shop.md5_api_token,
            key: shop.key_code,
            keyFull: shop.key_code_full,
            mp: shop.market_place_title,
            phone: shop.phone,
            clientId: shop.client_id,
          })) || []
        ).filter((data) =>
          LANG === "ru"
            ? data.mp !== "ml"
            : !(data.mp === "oz" || data.mp === "wb" || data.mp === "ym")
        ),
    }),
    createShop: build.mutation<ILinkedShop, ICreateLinkShopReq>({
      query: (data) => ({
        url: "/org_api/createApiMarketPlace",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
      transformResponse: ({
        response: data,
      }: {
        response: ILinkedShopRes;
      }) => ({
        id: data.id,
        title: data.company_title,
        shop_title: data.shop_title,
        token: data.md5_api_token,
        key: data.key_code,
        keyFull: data.key_code_full,
        mp: data.market_place_title,
        phone: data.phone,
        clientId: data.client_id,
      }),
    }),
    deleteShop: build.mutation<ILinkedShop, IDeleteLinkShopReq>({
      query: (data) => ({
        url: "/org_api/delete/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    updateShop: build.mutation<ILinkedShop, IUpdateLinkShopReq>({
      query: (data) => ({
        url: "/org_api/updateApiMarketPlace",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
      transformResponse: ({
        response: data,
      }: {
        response: ILinkedShopRes;
      }) => ({
        id: data.id,
        title: data.company_title,
        shop_title: data.shop_title,
        token: data.md5_api_token,
        key: data.key_code,
        keyFull: data.key_code_full,
        mp: data.market_place_title,
        phone: data.phone,
        clientId: data.client_id,
      }),
    }),
    getDashboard: build.query<IDasboardData, IApiReq>({
      query: (data) => ({
        url: "/data/getDashboard",
        method: "POST",
        body: data,
      }),
      providesTags: ["Dashboard"],
      transformResponse: (data: IGetDashboardResponce) => data.response,
    }),
    getDashboardAll: build.query<IDashboardScreenProps[], string>({
      query: () => ({
        url: "/data/getDashboardAll",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
      transformResponse: (data: { response: IGetDashboardAllResponce[] }) => {
        return (
          data.response?.map((data) => ({
            marketName: data.title,
            marketGraphData: data.data?.graph,
            marketSalesTotal: data.data?.sales_summary || 0,
            isAddedByUser: data.exists,
            top5: data.data?.top_5_products,
          })) || []
        ).filter((data) =>
          LANG === "ru"
            ? data.marketName !== "ml"
            : !(
                data.marketName === "oz" ||
                data.marketName === "wb" ||
                data.marketName === "ym"
              )
        );
      },
    }),
  }),
});

export const {
  useLazyGetDashboardQuery,
  useGetDashboardAllQuery,
  useGetLinkedShopsQuery,
  useCreateShopMutation,
  useDeleteShopMutation,
  useUpdateShopMutation,
} = dashboardAPI;
