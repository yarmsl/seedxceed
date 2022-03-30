import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "..";

export const authSelector = (state: TRootState): IAuthState => state.auth;

export const isAuthSelector = createSelector(
  authSelector,
  (authState: IAuthState) => authState.isAuth
);

export const isAuthCheckedSelector = createSelector(
  authSelector,
  (authState: IAuthState) => authState.isAuthChecked
);
