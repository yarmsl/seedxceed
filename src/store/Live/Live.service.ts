import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA_API_URL } from "../../configuration/baseUrls";
import { LiveDataTransform } from "./Live.transform";

export const liveAPI = createApi({
  reducerPath: "liveAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${DATA_API_URL}/api/robotorg_life`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Live"],
  endpoints: (build) => ({
    getLive: build.query<ITransformedLiveRes[], IGetLiveReq>({
      query: (request) => ({
        url: `/getLive`,
        method: "POST",
        body: request,
      }),
      providesTags: ["Live"],
      transformResponse: (data: IGetLiveRes[]) => LiveDataTransform(data),
    }),
  }),
});

export const { useGetLiveQuery } = liveAPI;
