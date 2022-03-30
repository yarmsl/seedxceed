import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IProductsState = {
  ptPage: 0,
  ptRows: 10,
  ptOrder: "desc",
  ptOrderBy: "name",
  ptSearch: "",
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPtPage: (state, action: PayloadAction<number>) => {
      state.ptPage = action.payload;
    },
    setPtRows: (state, action: PayloadAction<number>) => {
      state.ptRows = action.payload;
    },
    setPtOrder: (state, action: PayloadAction<orderTypes>) => {
      state.ptOrder = action.payload;
    },
    setPtOrderBy: (state, action: PayloadAction<keyof IProduct>) => {
      state.ptOrderBy = action.payload;
    },
    setPtSearch: (state, action: PayloadAction<string>) => {
      state.ptSearch = action.payload;
    },
    resetProducts: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPtPage,
  setPtRows,
  setPtOrder,
  setPtOrderBy,
  setPtSearch,
  resetProducts,
} = ProductsSlice.actions;
export const { reducer: ProductsReducer } = ProductsSlice;
