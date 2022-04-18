interface ISendUrl {
  phone: string;
  url: string;
  agreement: boolean;
}

interface IUrlPay extends ISendUrl {
  PaymentURL: string;
}
interface IUrlPayRecul extends ISendUrl {
  promo_price(promo_price: unknown);
  PaymentURL: string;
  promocode: string;
  price: number;
  promo_code: number;
}

interface ISendUrlphone extends ISendUrl {
  phone: string | null;
}

interface ISendUrlVIa extends ISendUrl {
  url: string;
}
interface IPayMent {
  price: number;
  region: string;
  type: string;
}

interface IPayMentRecal {
  price: number;
  region: string;
  type: string;
  promocode: string;
  promo_price: number;
}

interface ISendMailReq {
  phone: string;
}

interface ISendMailRes {
  error: boolean;
  status: string;
}

type stringRes = string;
