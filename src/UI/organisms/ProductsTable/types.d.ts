interface IProductsTableColumn {
  id: keyof IProduct;
  label: string;
  sort: boolean;
  type: "string" | "number";
  format?: (
    value: string | number,
    search: string
  ) => JSX.Element | string | number;
}

interface IProductsTableProps {
  products: IProduct[];
  isLoading: boolean;
  handleSort: (id: keyof IProduct) => void;
  order: orderTypes;
  orderBy: keyof IProduct;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleDeleted: () => void;
  productsCount: number;
  isDeleted: boolean;
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mp: supportedMarketTypes;
}
