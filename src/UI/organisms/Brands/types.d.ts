interface IBrandsProps {
  brands: Records<string, IBrand>;
  isFetching: boolean;
}

interface IBrand {
  graph: Graph;
  orders_price: number;
  orders_price_changes: number;
  summary: ISummary;
  top_5_products: Product[];
}

type IBrandTransformed = Omit<IBrand, "graph"> & {
  graph: IGraphDataBrand[];
};

interface IBrandsState extends IBrand {
  brand: string;
}

interface ISummary {
  days_on_sale: number;
  orders: number;
  products_count: number;
  returns: number;
  sales: number;
}

type Product = { count: number; name: string; photo: string };

type Graph = Record<string, { orders_price: number; sales_price: number }>;

interface IGraphDataBrand {
  date: string;
  orders_price: number;
  sales_price: number;
}
