import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PASSPORT_URL, DATA_API_URL } from "../../configuration/baseUrls";

export const authAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    sendCodeViaSms: build.mutation<IConfirmPhoneRes, IConfirmPhoneReq>({
      query: (data) => ({
        url: `${DATA_API_URL}/api/send_sms/send`,
        method: "POST",
        body: data,
      }),
    }),
    checkEnteredCode: build.mutation<IConfirmPhoneRes, ICheckCodeReq>({
      query: (data) => ({
        url: `${DATA_API_URL}/api/send_sms/check`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation<string, IResetPassReq>({
      query: (data) => ({
        url: `${PASSPORT_URL}/api/auth/password/reset`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: build.mutation<string, IChangePassReq>({
      query: (data) => ({
        url: `${PASSPORT_URL}/api/auth/password/reset/change`,
        method: "POST",
        body: data,
        responseHandler: "text",
      }),
    }),
    checkAuth: build.query<ICheckAuthRes, string>({
      query: () => ({
        url: `${PASSPORT_URL}/api/auth/check`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSendCodeViaSmsMutation,
  useCheckEnteredCodeMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useCheckAuthQuery,
} = authAPI;
