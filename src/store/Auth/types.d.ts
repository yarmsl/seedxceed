interface IAuthState {
  isAuth: boolean;
  isAuthChecked: boolean;
  aToken: string;
  isLoadingAuth: boolean;
  isLoadingCheck: boolean;
  isLoadingReg: boolean;
  authType: "password" | "google" | null;
  user: IAuthUserWphone;
  smsTimer: number;
}
interface IAuthUser {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  photo: string | null;
}

interface ISingInViaEmail {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface ISignInViaEmailRes {
  user: IAuthUser;
}

interface ICheckAuthRes {
  a_token: string;
  resData: IAuthUser;
}

interface ISingUpViaEmailReq {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface ISingUpViaEmailRes {
  user: IAuthUser & { phone: string };
}

interface IAuthUserWphone extends IAuthUser {
  phone: string | null;
}

interface IConfirmPhoneReq {
  phone: string;
}

interface ICheckCodeReq {
  code: string;
}

interface IConfirmPhoneRes {
  status: boolean;
  statusText: string;
}

interface IResetPassReq {
  email: string;
}

interface IChangePassReq {
  password: string;
  password_repeat: string;
}

type stringRes = string;
