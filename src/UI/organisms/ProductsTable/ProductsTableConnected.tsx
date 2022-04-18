import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { isTokensConsistMp } from "store/Dashboard";
import {
  setPtPage,
  setPtRows,
  setPtOrder,
  setPtOrderBy,
  setPtSearch,
  useGetProductsQuery,
} from "store/Products";
import ProductsTable from "./ProductsTable";
import { ProductsTableColumns } from "./ProductsTableColumns";

const ProductsTableConnected = () => {
  const dispatch = useAppDispatch();
  const { calendarSelector, mpSelector, shopSelector } = useAppSelector(
    (st) => st.ui
  );
  const { d, dd } = calendarSelector;
  const isTokensOfMp = useAppSelector(isTokensConsistMp);
  const isConsistense = useCallback(
    (mp: supportedMarketTypes, tokens: string[]) => isTokensOfMp(mp, tokens),
    [isTokensOfMp]
  );
  const { ptPage, ptRows, ptOrder, ptOrderBy, ptSearch } = useAppSelector(
    (st) => st.products
  );
  const [isDeleted, setIsDeleted] = useState(false);

  const toggleDeleted = useCallback(() => {
    if (isDeleted) {
      dispatch(setPtPage(0));
      setIsDeleted(false);
    } else {
      dispatch(setPtPage(0));
      setIsDeleted(true);
    }
  }, [dispatch, isDeleted]);

  const mp = useMemo(() => mpSelector[0], [mpSelector]);

  const handleSort = useCallback(
    (id: keyof IProduct) => {
      const isAsc = ptOrderBy === id && ptOrder === "desc";
      dispatch(setPtOrder(isAsc ? "asc" : "desc"));
      dispatch(setPtOrderBy(id));
    },
    [dispatch, ptOrder, ptOrderBy]
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => dispatch(setPtPage(newPage)),
    [dispatch]
  );

  const handleChangeRowsPerPage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPtRows(parseInt(e.target.value, 10)));
      setPtPage(0);
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPtPage(0));
      dispatch(setPtSearch(e.target.value));
    },
    [dispatch]
  );

  const skip = useMemo(
    () =>
      mpSelector.length === 0 ||
      shopSelector.length === 0 ||
      !isConsistense(mpSelector[0], shopSelector),
    [isConsistense, mpSelector, shopSelector]
  );

  const { data, isFetching } = useGetProductsQuery(
    {
      d,
      dd,
      m: mpSelector[0],
      user_id: shopSelector,
    },
    { skip }
  );

  const products = useMemo(
    () =>
      Array.isArray(data)
        ? isDeleted
          ? data.filter(
              (pr) => pr.name === "Карточка удалена" || pr.name === ""
            )
          : data.filter(
              (pr) => !(pr.name === "Карточка удалена" || pr.name === "")
            )
        : [],
    [data, isDeleted]
  );

  const searchedProducts = useMemo(
    () =>
      ptSearch.length > 0
        ? products.filter(
            (p) => p.name.toLowerCase().indexOf(ptSearch.toLowerCase()) !== -1
          )
        : products,
    [products, ptSearch]
  );

  const productsCount = useMemo(
    () => searchedProducts.length,
    [searchedProducts.length]
  );

  const sortedProducts = useMemo(() => {
    const type =
      ProductsTableColumns.find((col) => col.id === ptOrderBy)?.type ||
      "number";
    return (
      [...searchedProducts]?.sort((a, b) => {
        switch (type) {
          case "string":
            return ptOrder === "desc"
              ? (a[ptOrderBy] as string).localeCompare(b[ptOrderBy] as string)
              : (b[ptOrderBy] as string).localeCompare(a[ptOrderBy] as string);
          default:
            return ptOrder === "desc"
              ? (a[ptOrderBy] as number) - (b[ptOrderBy] as number)
              : (b[ptOrderBy] as number) - (a[ptOrderBy] as number);
        }
      }) || []
    );
  }, [searchedProducts, ptOrderBy, ptOrder]);

  const paginatedProducts = useMemo(
    () =>
      sortedProducts.slice(
        ptRows * (ptPage + 1) - ptRows,
        ptRows * (ptPage + 1)
      ),
    [ptPage, ptRows, sortedProducts]
  );

  useEffect(() => {
    if (isFetching) {
      dispatch(setPtPage(0));
    }
  }, [dispatch, isFetching]);

  return (
    <ProductsTable
      products={paginatedProducts}
      isLoading={isFetching}
      handleSort={handleSort}
      order={ptOrder}
      orderBy={ptOrderBy}
      page={ptPage}
      handleChangePage={handleChangePage}
      rowsPerPage={ptRows}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      toggleDeleted={toggleDeleted}
      productsCount={productsCount}
      isDeleted={isDeleted}
      search={ptSearch}
      handleSearch={handleSearch}
      mp={mp}
    />
  );
};

export default memo(ProductsTableConnected);
