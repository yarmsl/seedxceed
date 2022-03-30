import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA_API_URL } from "../../configuration/baseUrls";

export const complaintsAPI = createApi({
  reducerPath: "complaintsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${DATA_API_URL}/api/parser`,
    credentials: "include", // для кук
  }),
  tagTypes: ["Complaints"],
  endpoints: (build) => ({
    addParserTask: build.mutation<IComplaintsDataRes, IComplaintsDataReq>({
      query: (complaintData) => ({
        url: "/complaints",
        method: "POST",
        body: complaintData,
      }),
      invalidatesTags: ["Complaints"],
    }),
    getCompaniesComplaints: build.query<IGetCompaniesComplaints, string>({
      query: (search_string) => ({
        url: `/getCompanies/${search_string}`,
        method: "GET",
      }),
    }),
    getAllTasksComplaints: build.query<IComplaint[], string>({
      query: () => ({
        url: "/getTasks",
        method: "GET",
      }),
      providesTags: ["Complaints"],
    }),
    getStatusTasks: build.query<IStatusTasks[], number>({
      query: (task_id) => ({
        url: `/getStatusTasks/${task_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const FavoriteAPI = createApi({
  reducerPath: "FavoriteAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${DATA_API_URL}/api/botproductup`,
    credentials: "include",
  }),
  tagTypes: ["Favorite"],
  endpoints: (build) => ({
    getFavorites: build.query<TaskFavorite[], number | null>({
      query: (user_id) => ({
        url: `/getstatuses/${user_id}`,
        method: "GET"
      }),
      providesTags: ["Favorite"],
      transformResponse: (data: ResponseGetFavorite) => data.data
    }),
    createFavorite: build.mutation<ResponseCreateFavorite, RequestCreateFavorite>({
      query: ({newLinks, id}: RequestCreateFavorite) => ({
        url: `/wb/create/${id}`,
        method: "POST",
        body: {
          links: newLinks,
          phone: ["9675558006", "9581119270"],
          type: "favourite"
        }
      }),
      invalidatesTags: ["Favorite"],
      transformResponse: (data: ResponseCreateFavorite) => data
    }),
    startFavorite: build.mutation<ResponseStartFavorite, RequestStartFavorite>({
      query: ({newLinks, id, task_id}: RequestStartFavorite) => ({
        url: `/wb/favourite/start/${id}`,
        method: "POST",
        body: {
          links: newLinks,
          phone: ["9675558006", "9581119270"],
          type: "favourite",
          task_id
        }
      })
    })
  })
})

export const {
  useAddParserTaskMutation,
  useGetAllTasksComplaintsQuery,
  useGetCompaniesComplaintsQuery,
  useLazyGetCompaniesComplaintsQuery,
  useGetStatusTasksQuery,
  useLazyGetStatusTasksQuery,
} = complaintsAPI;

export const {
  useGetFavoritesQuery,
  useCreateFavoriteMutation,
  useStartFavoriteMutation
} = FavoriteAPI