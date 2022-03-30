import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  signOutThunkAction,
  singInViaEmailThunkAction,
  singUpViaEmailThunkAction,
} from "./Auth.actions";
import { authAPI } from "./Auth.service";

const initialState: IAuthState = {
  isAuth: false,
  isAuthChecked: false,
  isLoadingAuth: false,
  isLoadingCheck: false,
  isLoadingReg: false,
  aToken: "",
  authType: null, // ненадёжная штука (из-за апи)
  user: {
    firstName: "",
    lastName: "",
    email: "",
    photo: null,
    id: null,
    phone: null,
  },
  smsTimer: 0,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSmsTimer: (state, action: PayloadAction<number>) => {
      state.smsTimer = action.payload;
    },
    signOut: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(singInViaEmailThunkAction.pending, (state) => {
      state.isLoadingAuth = true;
    });
    builder.addCase(
      singInViaEmailThunkAction.fulfilled,
      (state, action: PayloadAction<IAuthUser>) => {
        state.isLoadingAuth = false;
        state.isAuth = true;
        state.isAuthChecked = true;
        state.authType = "password";
        state.user = { ...state.user, ...action.payload };
      }
    );
    builder.addCase(singInViaEmailThunkAction.rejected, (state) => {
      state.isLoadingAuth = false;
    });
    builder.addCase(singUpViaEmailThunkAction.pending, (state) => {
      state.isLoadingReg = true;
    });
    builder.addCase(
      singUpViaEmailThunkAction.fulfilled,
      (state, action: PayloadAction<IAuthUserWphone>) => {
        state.isLoadingReg = false;
        state.isAuth = true;
        state.user = { ...state.user, ...action.payload };
      }
    );
    builder.addCase(singUpViaEmailThunkAction.rejected, (state) => {
      state.isLoadingReg = false;
    });
    builder.addCase(signOutThunkAction.fulfilled, (state) => {
      Object.assign(state, initialState);
    });
    builder.addCase(signOutThunkAction.rejected, (state) => {
      Object.assign(state, initialState);
    });
    builder.addMatcher(authAPI.endpoints.checkAuth.matchPending, (state) => {
      state.isLoadingCheck = true;
    });
    builder.addMatcher(
      authAPI.endpoints.checkAuth.matchFulfilled,
      (state, action) => {
        state.isLoadingCheck = false;
        state.isAuth = true;
        state.isAuthChecked = true;
        state.aToken = action.payload.a_token;
        state.user = { ...state.user, ...action.payload.resData };
      }
    );
    builder.addMatcher(authAPI.endpoints.checkAuth.matchRejected, (state) => {
      Object.assign(state, initialState);
      state.isAuthChecked = true;
    });
  },
});

export const { signOut, setSmsTimer } = AuthSlice.actions;
export const { reducer: AuthReducer } = AuthSlice;
