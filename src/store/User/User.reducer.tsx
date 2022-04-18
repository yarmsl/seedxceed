import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserThunkAction,
  editDataProfile,
  changePasswordUser,
  getPaymentsUser,
} from "./User.actions";

const initialState: IUserState = {
  isUserDataLoading: false,
  isUserRequestLoading: false,
  isUserUpdatePassLoading: false,
  isPaymentsDataLoading: false,
  payments: [],
  data: {
    passport_id: null,
    first_name: "",
    second_name: "",
    email: "",
    photo: null,
    birth_date: null,
    company_site: null,
    company_title: null,
    external_id: null,
    id: null,
    new_email: null,
    old_email: null,
    patronymic: null,
    phone: null,
    role: "customer",
    token_ozon: null,
    token_wb: null,
    created_at: null,
    updated_at: null,
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserThunkAction.pending, (state) => {
      state.isUserDataLoading = true;
    });
    builder.addCase(
      getUserThunkAction.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isUserDataLoading = false;
        state.data = { ...state.data, ...action.payload };
      }
    );
    builder.addCase(getUserThunkAction.rejected, (state) => {
      state.isUserDataLoading = false;
    });
    builder.addCase(editDataProfile.pending, (state) => {
      state.isUserRequestLoading = true;
    });
    builder.addCase(
      editDataProfile.fulfilled,
      (state, action: PayloadAction<Partial<IUser>>) => {
        state.isUserRequestLoading = false;
        state.data = { ...state.data, ...action.payload };
      }
    );
    builder.addCase(changePasswordUser.pending, (state) => {
      state.isUserUpdatePassLoading = true;
    });
    builder.addCase(changePasswordUser.fulfilled, (state) => {
      state.isUserUpdatePassLoading = false;
    });
    builder.addCase(getPaymentsUser.pending, (state) => {
      state.isPaymentsDataLoading = true;
    });
    builder.addCase(
      getPaymentsUser.fulfilled,
      (state, action: PayloadAction<IPaymentRes>) => {
        state.isPaymentsDataLoading = false;
        state.payments = action.payload.response;
      }
    );
    builder.addCase(getPaymentsUser.rejected, (state) => {
      state.isPaymentsDataLoading = false;
    });
  },
});

export const { resetUser } = UserSlice.actions;
export const { reducer: UserReducer } = UserSlice;
