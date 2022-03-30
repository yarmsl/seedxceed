interface IUserState {
  isUserDataLoading: boolean;
  isUserRequestLoading: boolean;
  isUserUpdatePassLoading: boolean;
  isPaymentsDataLoading: boolean;
  data: IUser;
  payments: IPayment[];
}

interface IUser {
  passport_id: number | null;
  first_name: string;
  second_name: string;
  email: string;
  photo: string | null;
  birth_date: string | null;
  company_site: string | null;
  company_title: string | null;
  external_id: string | null;
  id: number | null;
  new_email: string | null;
  old_email: string | null;
  patronymic: string | null;
  phone: string | null;
  role: userRoles;
  token_ozon: string | null;
  token_wb: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface IGetUserRes {
  data: {
    user: IUser;
  };
}

interface IUpdateUserRes {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string | null;
    email: string;
    birth_date: string | null;
    company_site: string | null;
    company_title: string | null;
    photo: string | null;
    phone: string;
    status: boolean;
    statusText: string;
  };
}

interface IUpdateUserReq {
  user_name: string;
  user_surname: string;
  user_patronymic: string;
  user_email: string;
  birth_date: string;
  company_site: string;
  company_title: string;
  photo: string | null;
  phone: string;
}

interface IChangedUserPassReq {
  new_password: string;
  old_password: string;
}

interface IPayment {
  created_at: string;
  id: number;
  region: string;
  status: string;
  title: string;
  total: number;
  type: string;
  updated_at: string;
  user_id: number;
}

interface IPaymentRes {
  response: IPayment[];
}

type userRoles = "admin" | "customer";

type passport_id = number;
