import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA_API_URL } from "../../configuration/baseUrls";
import { getProductByIdTransformResponse } from "./Products.transform";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${DATA_API_URL}/api/data`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Product"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getCategoriesWb: build.query<ICategoryRes[], IGetCategoryWbReq>({
      query: ({ w, token }) => ({
        url: `/getCategories?m=wb&w=${encodeURIComponent(
          w
        )}&token=${encodeURIComponent(token)}`,
        method: "GET",
      }),
      transformResponse: (data: IGetCategoryRes) => data?.response || [],
    }),
    getCategoriesOz: build.query<ICategoryOzRes[], IGetCategoryReq>({
      query: ({ token }) => ({
        url: `/getCategories?m=oz&token=${encodeURIComponent(token)}`,
        method: "GET",
      }),
      transformResponse: (data: IGetCategoryOzRes) => data?.response || [],
    }),
    getCategoriesYm: build.query<IGetCategoryYmTransformedRes[], number>({
      query: (id) => ({
        url: `/getCategories/ym/?id=${id}`,
        method: "GET",
      }),
      transformResponse: (data: IGetCategoryYmRes[]) =>
        data?.map((d) => ({ title: d.title, id: d.id })) || [],
    }),
    getAllFieldsByCategoryWb: build.query<
      IFieldsWbRes[],
      IGetAllFieldsByCategoryReq
    >({
      query: ({ category_name, token }) => ({
        url: `/getFields?m=wb&category_name=${encodeURIComponent(
          category_name
        )}&token=${encodeURIComponent(token)}`,
        method: "GET",
      }),
      transformResponse: (data: IGetAllFieldsByCategoryWbRes) =>
        data?.response || [],
    }),
    getAllFieldsByCategoryOz: build.query<
      IFieldsOzRes[],
      IGetAllFieldsByCategoryOzReq
    >({
      query: ({ category_name, category_id, token }) => ({
        url: `/getFields?m=oz&category_name=${encodeURIComponent(
          category_name
        )}&category_id=${encodeURIComponent(
          category_id
        )}&token=${encodeURIComponent(token)}`,
        method: "GET",
      }),
      transformResponse: (data: IGetAllFieldsByCategoryOzRes) =>
        data?.response || [],
    }),
    getAttributeSpecsWb: build.query<ISpecsRes[], IGetAttributeSpecsWbReq>({
      query: ({ dictionary, pattern, token }) => ({
        url: `/get_attribute_specs?m=wb&pattern=${encodeURIComponent(
          pattern
        )}&dictionary=${encodeURIComponent(
          dictionary
        )}&token=${encodeURIComponent(token)}`,
        method: "GET",
      }),
      transformResponse: (data: IGetAttributeSpecsWbRes) => data.response,
    }),
    getAttributeSpecsOz: build.query<ISpecsOzRes[], IGetAttributeSpecsOzReq>({
      query: ({ attribute_id, category_id, token }) => ({
        url: `/get_attribute_specs?category_id=${encodeURIComponent(
          category_id
        )}&attribute_id=${encodeURIComponent(
          attribute_id
        )}&m=oz&token=${encodeURIComponent(token)}`,
        method: "GET",
      }),
      transformResponse: (data: IGetAttributeSpecsOzRes) => data.response,
    }),
    // getMarketSkuYm: build.query<any, IGetMarketSkuYmReq>({
    //   query: (request) => ({
    //     url: "/get_market_sku",
    //     method: "POST",
    //     body: request,
    //   }),
    //   transformResponse: (data: any) => data,
    // }),
    // getPostedCard: build.query<any, IGetPostedCardReq>({
    //   query: ({ article, m, token }) => ({
    //     url: `/getCard?article=${encodeURIComponent(
    //       article
    //     )}&m=${encodeURIComponent(m)}&token=${encodeURIComponent(token)}`,
    //     method: "GET",
    //   }),
    //   transformResponse: (data: any) => data,
    // }),
    postProductCardWb: build.mutation<IPostProductCardRes, FormData>({
      query: (request) => ({
        url: "/createProduct",
        method: "POST",
        body: request,
      }),
    }),
    postProductCardOz: build.mutation<IPostProductCardRes, FormData>({
      query: (request) => ({
        url: "/createProduct",
        method: "POST",
        body: request,
      }),
    }),
    postProductCardYm: build.mutation<IPostProductCardYmRes, FormData>({
      query: (request) => ({
        url: "/createProduct",
        method: "POST",
        body: request,
      }),
    }),
    getProducts: build.query<IProduct[], IApiReq>({
      query: (request) => ({
        url: "/getProducts",
        method: "POST",
        body: request,
      }),
      transformResponse: (data: IGetProductsRes) =>
        data.response?.products || [],
    }),
    getProductById: build.query<
      IProductFullTransformRes,
      Omit<IApiReq, "lang"> & { id: string }
    >({
      query: ({ id, d, dd, m, user_id }) => ({
        url: `/getProduct/${id}/0`,
        method: "POST",
        body: { d, dd, m, user_id },
      }),
      transformResponse: (data: IGetProductRes) =>
        getProductByIdTransformResponse(data.response.products?.[0]),
    }),
  }),
});

export const {
  useLazyGetCategoriesWbQuery,
  useGetCategoriesOzQuery,
  useGetCategoriesYmQuery,
  useLazyGetAllFieldsByCategoryWbQuery,
  useLazyGetAllFieldsByCategoryOzQuery,
  useGetAttributeSpecsOzQuery,
  useLazyGetAttributeSpecsWbQuery,
  // useLazyGetMarketSkuYmQuery
  // useLazyGetPostedCardQuery,
  usePostProductCardWbMutation,
  usePostProductCardOzMutation,
  usePostProductCardYmMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productAPI;
