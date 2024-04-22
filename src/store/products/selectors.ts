import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { initialState } from "./slice";

/** Function to select the slice domain */
const selectDomain = (state: RootState) =>
  state["feature/Products"] || initialState;

/** Selector for getting search term */
export const selectSearchTerm = createSelector(
  [selectDomain],
  (state) => state.searchTerm,
);

/** Selector for getting product id to delete and delete modal status */
export const selectDeleteProductInfo = createSelector(
  [selectDomain],
  (state) => ({
    productId: state.productIdToDelete,
    showDeleteProductModal: state.showDeleteProductModal,
  }),
);
