import { createSlice } from "@reduxjs/toolkit";
import { createPaymentThunkAction } from "./Scanner.actions";

const initialState = {
  price: 990,
  promocode: null,
  payment: null,
  agreement: true,
  region: "ru",
  type: "scaner",
};

const PaymentScannerSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    PaymentScanner: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPaymentThunkAction.fulfilled, (state, action) => {
      state.price = 990;
      state.agreement = true;
    });
  },
});

export const { reducer: PaymentScannerReducer } = PaymentScannerSlice;
