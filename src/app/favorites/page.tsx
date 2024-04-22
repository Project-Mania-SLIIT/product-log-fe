"use client";
import { useSelector } from "react-redux";

import { selectFavoriteProducts } from "@/store/favorite-products/selectors";
import Navbar from "@components/app/navbar";
import PageTitle from "@components/app/page-title";
import Toolbar from "@components/app/toolbar";
import ProductsList from "@features/products-list";

const FavoritesRoute = () => {
  const favoriteProducts = useSelector(selectFavoriteProducts);

  return (
    <main className="container h-full max-w-screen-lg px-4">
      <div className="sticky top-0 z-10 bg-bgPrimary">
        <Navbar />
        <PageTitle primaryTitle="Products" secondaryTitle="Favourites" />
        <Toolbar />
      </div>
      <ProductsList data={favoriteProducts} />
    </main>
  );
};

export default FavoritesRoute;
