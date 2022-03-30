import { createAsyncThunk } from "@reduxjs/toolkit";
import { TAppDispatch, TRootState } from "..";
import { DATA_API_URL } from "../../configuration/baseUrls";
import { apiPost } from "../../lib/api";
import { showErrorSnackbar } from "../Notifications";

export const getReqStat = createAsyncThunk<
  IGetReqStatRes,
  string[],
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("darkside/favorite/getreqstat", async (request, { dispatch, getState }) => {
  try {
    const state = getState();
    const res = await apiPost<IGetReqStatRes, IGetReqStatReq>(
      `${DATA_API_URL}/api/botproductup/create/${state.user.data.id}`,
      {
        phone: ["9675558006", "9581119270"],
        links: request,
      }
    );
    return res;
  } catch (e) {
    const err =
      e instanceof Error ? `User Data Error: ${e.message}` : "User Data Error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});
