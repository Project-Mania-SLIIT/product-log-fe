import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { initialState } from "./slice";

/** Function to select the slice domain */
const selectDomain = (state: RootState) =>
  state["feature/favoriteProducts"] || initialState;

/** Selector for getting favorite products */
export const selectFavoriteProducts = createSelector(
  [selectDomain],
  (state) => state.favoriteProducts,
);
