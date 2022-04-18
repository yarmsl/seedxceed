import { Middleware } from "@reduxjs/toolkit";
import { AppStore } from "store";

export const TokenMiddleware: Middleware = (store) => (next) => (action) => {
  console.log((store as unknown as AppStore).getState());
  return next(action);
};
