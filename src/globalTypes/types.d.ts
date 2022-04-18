type supportedMarketTypes = "oz" | "ym" | "ml" | "wb";

type timeStampTypes = "yesterday" | "week" | "month" | "all" | number;

interface IApiReq {
  d: timeStampTypes | Date;
  dd: number | Date;
  m: supportedMarketTypes;
  user_id: string[];
}

interface rtkQueryError {
  status: number;
  data: { message: string };
  message?: string;
}

interface errorBackEnd {
  message?: string;
}

type orderTypes = "asc" | "desc";
