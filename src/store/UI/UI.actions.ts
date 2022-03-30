import { createAsyncThunk } from "@reduxjs/toolkit";
import { DATA_API_URL } from "configuration/baseUrls";
import { apiPost } from "lib/api";
import { TAppDispatch, TRootState } from "store";
import { showErrorSnackbar } from "store/Notifications";

export const getExchangeRateThunkAction = createAsyncThunk<
  IExchangeRateRes,
  IExchangeRateReq,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("UI/getExchangeRateThunkAction", async (req, { dispatch }) => {
  const send = { lang: req.lang.substring(0, 2) };
  try {
    const res = await apiPost<IExchangeRateRes, IExchangeRateReq>(
      `${DATA_API_URL}/api/currency/get`,
      send
    );
    return res;
  } catch (e) {
    const err =
      e instanceof Error
        ? `Getting exchange rate error: ${e.message}`
        : "Getting exchange rate error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});
