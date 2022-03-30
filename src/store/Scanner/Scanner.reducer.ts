import { createSlice } from "@reduxjs/toolkit";
import { sendMailThunkAction } from "./Scanner.actions";

const initialState = {
  phone: "",
  url: "",
  agreement: true,
};

const SendMailSlice = createSlice({
  name: "sendmail",
  initialState,
  reducers: {
    sendMail: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMailThunkAction.fulfilled, (state, action) => {
      state.phone = action.payload.phone;
      state.url = action.payload.url;
      state.agreement = action.payload.agreement;
    });
  },
});






export const { reducer: sendMailReducer } = SendMailSlice;
