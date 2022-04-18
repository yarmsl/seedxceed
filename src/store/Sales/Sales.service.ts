import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA_API_URL } from "../../configuration/baseUrls";
import {
  getSalesDynamicsTransformResponse,
  getSalesTransformResponse,
  getSalesBrands,
} from "./Sales.transform";

export const salesAPI = createApi({
  reducerPath: "salesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${DATA_API_URL}/api`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Sales"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getSales: build.query<ISalesData, IApiReq>({
      query: (request) => ({
        url: "/data/getSales",
        method: "POST",
        body: request,
      }),
      transformResponse: (data: IGetSalesRes) =>
        getSalesTransformResponse(data),
    }),
    getSalesGeography: build.query<ISalesGeographyData, IApiReq>({
      query: (data) => ({
        url: "/data/salesGeography",
        method: "POST",
        body: data,
      }),
      transformResponse: (data: IGetSalesGeographyRes) => data.response,
    }),
    getSalesDynamics: build.query<
      ISalesDynamicsTransformedRes,
      ISalesDynamicsReq
    >({
      query: (data) => ({
        url: "/mp_data/get",
        method: "POST",
        body: data,
      }),
      transformResponse: (data: ISalesDynamicsRes) =>
        getSalesDynamicsTransformResponse(data),
    }),
    getBrands: build.query<IBrandsState[], IApiReq>({
      query: (data) => ({
        url: "/data/getBrands",
        method: "POST",
        body: data,
      }),
      transformResponse: (data: IBrandsRes, _, arg): IBrandsState[] =>
        getSalesBrands(data, arg.m),
    }),
  }),
});

export const {
  useGetSalesGeographyQuery,
  useGetSalesQuery,
  useGetSalesDynamicsQuery,
  useGetBrandsQuery,
} = salesAPI;
