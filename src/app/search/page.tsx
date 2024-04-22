"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { productActions } from "@/store/products/slice";
import Navbar from "@components/app/navbar";
import PageTitle from "@components/app/page-title";
import Toolbar from "@components/app/toolbar";
import SearchResultList from "@features/search-result-list";
import { getAllProductsFn } from "@utils/endpoints";

const SearchRoute = () => {
  const dispatch = useDispatch();
  const searchParam = useSearchParams().get("q") || "";

  useEffect(() => {
    if (searchParam?.trim()) {
      dispatch(productActions.setSearchTerm(searchParam.trim()));
    }
    return () => {
      dispatch(productActions.setSearchTerm(""));
    };
  }, [searchParam]);

  const { data, isPending } = useQuery({
    queryFn: getAllProductsFn,
    queryKey: ["all-products"],
  });

  const products = useMemo(() => {
    return data
      ?.filter(({ name }) =>
        name?.toLowerCase()?.includes(searchParam?.toLowerCase()),
      )
      ?.map(({ id, name, sku, images, description }) => {
        return { id, name, sku, image: images[0].data, description };
      });
  }, [data, searchParam]);

  return (
    <main className="container h-full max-w-screen-lg px-4">
      <div className="sticky top-0 z-10 bg-bgPrimary">
        <Navbar />
        <PageTitle primaryTitle="Search" />
        <Toolbar />
      </div>

      {searchParam.trim() && !isPending && (
        <div>
          <h4 className="font-medium text-textSecondary">
            {products?.length || 0} Results found for '{searchParam}'
          </h4>
        </div>
      )}

      <SearchResultList data={products} loading={isPending} />
    </main>
  );
};

export default SearchRoute;
