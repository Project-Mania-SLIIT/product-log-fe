"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import Navbar from "@components/app/navbar";
import PageTitle from "@components/app/page-title";
import Toolbar from "@components/app/toolbar";
import ProductsList from "@features/products-list";
import { getAllProductsFn } from "@utils/endpoints";

export default function Home() {
  const { data, isPending } = useQuery({
    queryFn: getAllProductsFn,
    queryKey: ["all-products"],
  });

  const products = useMemo(() => {
    return data?.map(({ id, name, sku, price, images }) => {
      return { id, name, sku, price, image: images[0].data };
    });
  }, [data]);

  return (
    <main className="container h-full max-w-screen-lg px-4">
      <div className="sticky top-0 z-10 bg-bgPrimary">
        <Navbar />
        <PageTitle primaryTitle="Products" />
        <Toolbar />
      </div>

      <ProductsList data={products} loading={isPending} />
    </main>
  );
}
