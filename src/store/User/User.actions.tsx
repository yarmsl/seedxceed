import { createAsyncThunk } from "@reduxjs/toolkit";
import { TAppDispatch, TRootState } from "..";
import { DATA_API_URL, PASSPORT_URL } from "../../configuration/baseUrls";
import { apiGet, apiPostWithToken, apiPost } from "../../lib/api";
import { showErrorSnackbar } from "../Notifications";

export const getUserThunkAction = createAsyncThunk<
  IUser,
  passport_id,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("user/getUserThunkAction", async (request, { dispatch }) => {
  try {
    const { data } = await apiGet<IGetUserRes>(
      `${DATA_API_URL}/api/users/passport_id/${request}`
    );
    return data.user;
  } catch (e) {
    const err =
      e instanceof Error ? `User Data Error: ${e.message}` : "User Data Error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});

export const editDataProfile = createAsyncThunk<
  Partial<IUser>,
  IUpdateUserReq,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("user/editDataProfile", async (request, { dispatch, getState }) => {
  const { auth } = getState();
  try {
    const res = await apiPostWithToken<IUpdateUserRes, IUpdateUserReq>(
      `${DATA_API_URL}/api/users/edit`,
      request,
      auth.aToken
    );
    return { ...res.data, second_name: res.data.last_name };
  } catch (e) {
    const err =
      e instanceof Error ? `User Data Error: ${e.message}` : "User Data Error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});

export const changePasswordUser = createAsyncThunk<
  string,
  IChangedUserPassReq,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("user/changePasswordUser", async (request, { dispatch }) => {
  try {
    const res = await apiPost<string, IChangedUserPassReq>(
      `${PASSPORT_URL}/api/auth/password/change`,
      request
    );
    return res;
  } catch (e) {
    const err =
      e instanceof Error ? `User Data Error: ${e.message}` : "User Data Error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});

export const getPaymentsUser = createAsyncThunk<
  IPaymentRes,
  undefined,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("user/getPaymentUser", async (_, { dispatch }) => {
  try {
    const res = await apiGet<IPaymentRes>(
      `${DATA_API_URL}/api/payments/get_payments_of_user`
    );
    return res;
  } catch (e) {
    const err =
      e instanceof Error ? `User Data Error: ${e.message}` : "User Data Error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});
