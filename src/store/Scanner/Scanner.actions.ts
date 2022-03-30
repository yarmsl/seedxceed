import { createAsyncThunk } from "@reduxjs/toolkit";
import { TAppDispatch, TRootState } from "..";
import { apiPost } from "../../lib/api";
import { showErrorSnackbar } from "store/Notifications";
import { DATA_API_URL } from "configuration/baseUrls";

export const sendMailThunkAction = createAsyncThunk<
  ISendUrl,
  ISendUrlVIa,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("sendMail/sendMailThunkAction", async (request, { dispatch }) => {
  try {
    const response = await apiPost<ISendUrl, ISendUrlVIa>(
      `${DATA_API_URL}/api/robotorg_scanner/sendMail`,
      request
    );
    return response;
  } catch (e) {
    const err = "error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});

export const createPaymentThunkAction = createAsyncThunk<
  IUrlPay,
  IPayMent,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("scanner/SET_PAYMENT", async (request, { dispatch }) => {
  try {
    const response = await apiPost<IUrlPay, IPayMent>(
      `${DATA_API_URL}/api/payments/create`,
      request
    );
    window.location.replace(response?.PaymentURL);
    return response;
  } catch (e) {
    const err = "error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});

export const reculatePaymentThunkAction = createAsyncThunk<
IUrlPayRecul,
  IPayMentRecal,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("scanner/SET_PAYMENT", async (request, { dispatch }) => {
  try {
    const response = await apiPost<IUrlPayRecul, IPayMentRecal>(
      `${DATA_API_URL}/api/payments/recalculation`,
      request
    );
    return response;
  } catch (e) {
    const err = "error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});



export const createSupportThunkAction = createAsyncThunk<
  ISendMailRes,
  ISendMailReq,
  {
    state: TRootState;
    dispatch: TAppDispatch;
  }
>("scanner/SEND_MAIL", async (request, { dispatch }) => {
  try {
    const res = await apiPost<ISendMailRes, ISendMailReq>(
      `${DATA_API_URL}/api/robotorg_scanner/sendMail`,
      request
    );
    return res;
  } catch (e) {
    const err = "error";
    dispatch(showErrorSnackbar(err));
    throw new Error(err);
  }
});

// if (data?.PaymentURL) {
//   window.location.replace(data?.PaymentURL);
// }
