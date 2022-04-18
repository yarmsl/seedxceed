import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA_API_URL } from "configuration/baseUrls";
// import type { ISendUrl } from "./types";

export const scannerAPI = createApi({
  reducerPath: "scannerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${DATA_API_URL}/api`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Scanner"],
  endpoints: (build) => ({
    reculatePayment: build.mutation<IUrlPayRecul, IPayMentRecal>({
      query: (data) => ({
        url: "/payments/recalculation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Scanner"],
    }),
  }),
});

export const { useReculatePaymentMutation } = scannerAPI;
