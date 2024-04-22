"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, reduxPersistor } from "@/store";
import Toaster from "@components/base/Toast";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate persistor={reduxPersistor}>
          {children}
          <Toaster />
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
