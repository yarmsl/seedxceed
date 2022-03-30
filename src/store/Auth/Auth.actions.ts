import { createAsyncThunk } from "@reduxjs/toolkit";
import { TAppDispatch, TRootState } from "..";
import { apiGet, apiPost } from "../../lib/api";
import { PASSPORT_URL } from "../../configuration/baseUrls";
import { batch } from "react-redux";
import { resetUser } from "../User";
import { authAPI } from "./Auth.service";
import { dashboardAPI, resetDashboard } from "store/Dashboard";
import { salesAPI } from "store/Sales";
import { complaintsAPI } from "store/DarkSide/DarkSide.service";
import { productAPI } from "store/Products";

export const singInViaEmailThunkAction = createAsyncThunk<
  IAuthUser,
  ISingInViaEmail,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("auth/singInViaEmailThunkAction", async (request, { rejectWithValue }) => {
  const { email, password } = request;
  try {
    const { user } = await apiPost<ISignInViaEmailRes, ISingInViaEmail>(
      `${PASSPORT_URL}/api/auth/email/signin`,
      { email, password },
      "json"
    );
    return user;
  } catch (e) {
    const err = new Error(
      e instanceof Error
        ? e.message === "user_not_found" || e.message === "wrong_password"
          ? "wrongPassLogin"
          : "authErr"
        : "authErr"
    );
    return rejectWithValue(err);
  }
});

export const singUpViaEmailThunkAction = createAsyncThunk<
  IAuthUserWphone,
  ISingUpViaEmailReq,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("auth/singUpViaEmailThunkAction", async (request, { rejectWithValue }) => {
  try {
    const { user } = await apiPost<ISingUpViaEmailRes, ISingUpViaEmailReq>(
      `${PASSPORT_URL}/api/auth/email/signup`,
      request,
      "json"
    );
    return user;
  } catch (e) {
    const err = new Error(
      e instanceof Error
        ? e.message === "user_exists"
          ? "userExists"
          : "regErr"
        : "regErr"
    );
    return rejectWithValue(err);
  }
});

export const signOutThunkAction = createAsyncThunk<
  stringRes,
  undefined,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("auth/signOutThunkAction", async (_, { dispatch }) => {
  try {
    const res = await apiGet<stringRes>(`${PASSPORT_URL}/api/auth/logout`);
    return res;
  } catch (e) {
    throw new Error(
      e instanceof Error
        ? `Registration Error: ${e.message}`
        : "Registration Error"
    );
  } finally {
    dispatch(clearStore());
  }
});

export const clearStore = () => {
  return (dispatch: (arg0: { payload: undefined; type: string }) => void) => {
    batch(() => {
      dispatch(resetUser());
      dispatch(resetDashboard());
      dispatch(authAPI.util.resetApiState());
      dispatch(dashboardAPI.util.resetApiState());
      dispatch(salesAPI.util.resetApiState());
      dispatch(complaintsAPI.util.resetApiState());
      dispatch(productAPI.util.resetApiState());
    });
  };
};
