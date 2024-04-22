import { ProductItem } from "@features/products-list";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  favoriteProducts: ProductItem[];
}

export const initialState: InitialState = {
  favoriteProducts: [],
};

export const favoriteProductSlice = createSlice({
  name: "feature/favoriteProducts",
  initialState,
  reducers: {
    toggleFavoriteStatus(state, action: PayloadAction<ProductItem>) {
      const productExist = state.favoriteProducts.find(
        ({ id }) => id === action.payload.id,
      );
      if (!productExist?.id) {
        state.favoriteProducts.push(action.payload);
      } else {
        state.favoriteProducts = state.favoriteProducts.filter(
          ({ id }) => id !== action.payload.id,
        );
      }
    },
    removeProductFromFavorite(
      state,
      action: PayloadAction<{ productId: string }>,
    ) {
      state.favoriteProducts = state.favoriteProducts.filter(
        ({ id }) => id !== action.payload.productId,
      );
    },
    updateProduct(state, action: PayloadAction<ProductItem>) {
      state.favoriteProducts = state.favoriteProducts?.map((product) =>
        product.id === action.payload.id ? action.payload : product,
      );
    },
  },
});

export const { actions: favoriteProductActions } = favoriteProductSlice;
