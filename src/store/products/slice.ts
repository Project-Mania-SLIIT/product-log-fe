import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AllProducts } from "@utils/endpoints";

export interface InitialState {
  searchTerm: string;
  productIdToDelete?: string;
  showDeleteProductModal: boolean;
}

export const initialState: InitialState = {
  searchTerm: "",
  productIdToDelete: "",
  showDeleteProductModal: false,
};

export const ProductSlice = createSlice({
  name: "feature/Products",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setProductIdToDelete(state, action: PayloadAction<{ productId: string }>) {
      state.productIdToDelete = action.payload.productId;
    },
    setShowDeleteProductModal(state, action: PayloadAction<boolean>) {
      state.showDeleteProductModal = action.payload;
    },
  },
});

export const { actions: productActions } = ProductSlice;
