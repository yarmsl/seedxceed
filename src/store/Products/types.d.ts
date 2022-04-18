interface IProductsState {
  ptPage: number;
  ptRows: number;
  ptOrder: orderTypes;
  ptOrderBy: keyof IProduct;
  ptSearch: string;
}

//Получение категорий
interface IGetCategoryReq {
  token: string;
}
interface IGetCategoryWbReq extends IGetCategoryReq {
  w: string;
}

interface ICategoryRes {
  category_name: string;
}

interface ICategoryOzRes extends ICategoryRes {
  category_id: number;
}

interface IGetCategoryRes {
  response: ICategoryRes[] | false;
}

interface IGetCategoryOzRes {
  response: ICategoryOzRes[] | false;
}

interface IGetCategoryYmRes extends IGetCategoryYmTransformedRes {
  category_id: number | null;
}

interface IGetCategoryYmTransformedRes {
  id: number;
  title: string;
}

//Получение полей по категории
interface IGetAllFieldsByCategoryReq {
  category_name: string;
  token: string;
}

interface IGetAllFieldsByCategoryOzReq extends IGetAllFieldsByCategoryReq {
  category_id: number;
}

interface IGetAllFieldsByCategoryWbRes {
  response: IFieldsWbRes[] | false;
}

interface IGetAllFieldsByCategoryOzRes {
  response: IFieldsOzRes[] | false;
}

interface IFieldsWbRes {
  attribute_name: string;
  is_required: boolean;
  dictionary: string;
}

interface IFieldsOzRes {
  id: number;
  name: string;
  description: string;
  type: TFieldsOzType;
  is_collection: boolean;
  is_required: boolean;
  group_id: number;
  group_name: string;
  dictionary_id: number;
}

type TFieldsOzType =
  | "String"
  | "Decimal"
  | "multiline"
  | "URL"
  | "ImageURL"
  | "Integer";

//Получение определенной характеристики поля
interface IGetAttributeSpecsWbReq {
  pattern: string;
  dictionary: string;
  token: string;
}

interface IGetAttributeSpecsOzReq {
  category_id: number;
  attribute_id: number;
  token: string;
}

interface ISpecsRes {
  attribute_value: string;
}

interface ISpecsOzRes extends ISpecsRes {
  attribute_id: number;
}

interface IGetAttributeSpecsWbRes {
  response: ISpecsRes[];
}

interface IGetAttributeSpecsOzRes {
  response: ISpecsOzRes[];
}

//Получение Market SKU YM

interface IGetMarketSkuYmReq {
  user_id: string[];
  m: "ym";
  data: {
    campaingnId: number;
    shopSku: number;
    name: string;
    category: string;
    vendor: string;
    vendorCode: string;
    barcodes: string[];
    price: number;
  };
}

//Получение карточки созданного товара

interface IGetPostedCardReq {
  article: string;
  m: supportedMarketTypes;
  token: string;
}

//Создание карточки товара
interface IPostProductCardRes {
  message: string;
}

interface IPostProductCardYmRes {
  message: string;
}
//WB
interface IPostProductCardWbReq {
  user_id: string[];
  m: "wb";
  data: {
    countryProduction: string;
    object: string;
    vendorCode: string;
    addin: IWbReqDataAddin[];
    nomenclatures: IWbReqDataNomenclatures[];
  };
}

interface IWbReqDataAddin {
  type: string;
  value?: string;
  count?: number;
}

interface IWbReqDataNomenclatures {
  vendorCode: string;
  variations: IWbReqDataNomenclaturesVariations[];
  addin: string[];
}

interface IWbReqDataNomenclaturesVariations {
  barcode: string;
  addin: IWbReqDataAddin[];
}

//Oz
interface IPostProductCardOzReq {
  user_id: string[];
  m: "oz";
  data: IPostProductCardOzReqData;
}

interface IPostProductCardOzReqData {
  attributes: IOzReqDataAttributes[];
  barcode?: string;
  category_id: number;
  depth: number;
  height: number;
  images: string[];
  name: string;
  offer_id: string;
  older_price?: string;
  premium_price?: string;
  price: string;
  vat: TVat;
  weight: number;
  width: number;
  primary_image: string;
}

type TVat = "0" | "0.1" | "0.2";

interface IOzReqDataAttributes {
  id: number;
  values: IOzReqDataAttributesValues[];
}
interface IOzReqDataAttributesValues {
  dictionary_value_id?: number;
  value: string;
}

//Ym
interface IPostProductCardYmReq {
  shopSku: string;
  name: string;
  category: string;
  manufacturerCountries: string[];
  pictures: string[];
  manufacturer?: string;
  urls?: string[];
  barcodes?: string[];
  certificate?: string;
  vendor?: string;
  vendorCode?: string;
  description?: string;
  boxCount?: number;
  price: string;
}

//getProducts

interface IGetProductsRes {
  response: {
    products: IProduct[];
    products_count: number;
  };
}

interface IGetProductRes {
  response: {
    products: IProductFull[];
    products_count: number;
  };
}

interface IProduct {
  barcode: string;
  brand: string;
  category: string;
  commission: number;
  commission_percent: number;
  commission_price: number;
  days_on_site: number;
  discount: number;
  full_stocks: number;
  logistics: number;
  logistics_from_client: number;
  logistics_in_way: number;
  logistics_per_unit: number;
  logistics_to_client: number;
  marginality: number;
  markup: number;
  mult_of_box: number;
  name: string;
  nm_id: string;
  nm_id_2: string;
  on_moderation: number;
  orders: number;
  orders_price: number;
  photo: string;
  price: number;
  price_with_disc: number;
  profit_price: number;
  pure_sales_price: number;
  rentability: number;
  returns: number;
  returns_price: number;
  sales: number;
  sales_price: number;
  self_price: number;
  self_stocks: number;
  stocks: number;
  stocks_price: number;
  stocks_self_price: number;
  supplier: string;
  supplier_article: string;
  supply_type: string;
  tech_size: string;
  user_id: string;
}

interface IProductGraph {
  average_discount: number;
  average_price: number;
  average_price_with_disc: number;
  new_reviews: number | "н/д";
  position: number | "н/д";
  rating: number | "н/д";
  returns_price: number;
  reviews: number | "н/д";
  sales: number;
  sales_price: number;
  stocks: number;
}

interface IProductFull extends IProduct {
  graph: Record<string, IProductGraph>;
  link: string;
  logistics_changes: { to_client_price: number; from_client_price: number };
  orders_changes: { orders_price: number; orders_count: number };
  profit_and_commissions_changes: {
    profit_price: number;
    commission_marketplace: number;
  };
  returns_changes: { returns_price: number; returns_count: number };
  sales_changes: { sales_price: number; sales_count: number };
  stocks_price_changes: { stocks_price: number; stocks_self_price: number };
}

interface IProductFullTransformRes extends IProductFull {
  graphData: IProductGraphTransform[];
  cardsData: ISalesCardData[];
}

interface IProductGraphTransform {
  date: string;
  sales: number;
  price: number;
  discount: number;
  refunds: number;
}
