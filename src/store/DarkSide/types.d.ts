interface IComplaintsDataReq extends IReport {
  search_string: string;
  without_company: string[];
  page_count: number;
}

interface IComplaintsDataRes {
  status: addTaskStatusTypes;
  message: addTaskMessageTypes;
}

interface IGetCompaniesComplaints {
  response: string[];
}

interface IComplaint {
  id: number;
  task: ITask;
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface ITask {
  url: string;
  without_company: string[];
  page_count: number;
  reportData: IReport;
  type: string;
}

interface IReport {
  what_matter: string;
  reason: string;
  desc_problem: string;
  name: string;
  email: string;
}

interface IStatusTasks {
  id: string;
  data: IDataStatusTasks | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  task_id: number;
}

interface IDataStatusTasks {
  product: string;
  url: string;
  ur: string;
}

type ResponseGetFavorite = {
  data: TaskFavorite[];
  tasks_count: number;
}

// type ResponseCreateFavorite = {
//   data: TransformedResponseCreateFavorite;
// }

type ResponseCreateFavorite = {
  message: string;
  task: {
    id: number;
    products: ProductFavorite[];
    status: string;
    user_id: number;
  }
}

type RequestCreateFavorite = {
  newLinks: string[];
  id: number | null;
}

interface RequestStartFavorite {
  newLinks: string[];
  id: number | null;
  task_id: number;
}

interface ResponseStartFavorite {
  message: string;
  status: string;
}

interface TaskFavorite {
  task: {
    id: number;
    status: string;
    updated_at: string;
    user_id: number
  }
  products: ProductFavorite[];
  products_count: number;
}

interface ProductFavorite {
  created_at: string;
  id: number;
  link: string;
  phone: string;
  status: string;
  task_id: number;
  updated_at: string;
  user_id: number;
}

interface IGetReqStatRes {
  message: string;
  req_ids: number[];
  stat_ids: number[];
  user_id: string;
}

interface IGetReqStatReq {
  links: string[];
  phone: string[];
}

type whatMatterTypes = "Проблемы с предложением" | "Проблемы с магазином";

type reasonTypes =
  | "Неправильные юридические данные"
  | "Подозрения в накрутке отзывов на Маркете"
  | "Сходные магазины (аффилиаты)"
  | "Продажа поддельной продукции"
  | "Продажа запрещённых товаров"
  | "Продажа товаров, бывших в употреблении"
  | "Подозрение в мошенничестве"
  | "Нет в наличии"
  | "Неверная цена"
  | "Сайт магазина недоступен"
  | "Неверная категория/модель"
  | "Неверные срок/стоимость доставки"
  | "Другое";

type addTaskStatusTypes = "successfully" | "request incorrectly.";
type addTaskMessageTypes = "Parser start work." | "error";


