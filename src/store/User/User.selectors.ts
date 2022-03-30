import {createSelector} from "@reduxjs/toolkit"
import {TRootState} from "../index";

export const userSelector = (state: TRootState): IUserState => state.user;

export const firstNameSelector = createSelector(
  userSelector,
  (user: IUserState) => user.data.first_name
)

export const getUserDataSelector = createSelector(
  userSelector,
  (user: IUserState) => user.data
)