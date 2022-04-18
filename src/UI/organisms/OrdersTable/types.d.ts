interface IOrdersTableConnectedProps {
  lives: IGetLiveResTransformed[];
}

interface IOrdersTableProps {
  data: IGetLiveResTransformed[];
  isMobile: boolean;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
  livesAmount: number;
}

interface IOrdersTableColumns {
  id: keyof IGetLiveResTransformed;
  label: string;
  format?: (
    value: string | number,
    data?: IGetLiveResTransformed
  ) => JSX.Element | string | number;
}

interface IOrderActionMenuProps {
  anchor: HTMLElement | null;
  handleClose: () => void;
  isLoading: boolean;
  isBarcode: boolean;
  getBarcode: () => Promise<void>;
}

interface IOrderRowProps {
  live: IGetLiveResTransformed;
  columns: IOrdersTableColumns[];
  page: number;
  i: number;
}
