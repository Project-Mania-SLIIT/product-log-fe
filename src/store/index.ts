import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { favoriteProductSlice } from "./favorite-products/slice";
import { ProductSlice } from "./products/slice";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["feature/favoriteProducts"],
  writeFailHandler(error: any) {
    console.log(error);
  },
};

const reducers = combineReducers({
  "feature/Products": ProductSlice.reducer,
  "feature/favoriteProducts": favoriteProductSlice.reducer,
});

export type RootState = {
  "feature/Products": ReturnType<typeof ProductSlice.reducer>;
  "feature/favoriteProducts": ReturnType<typeof favoriteProductSlice.reducer>;
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const reduxPersistor = persistStore(store);
