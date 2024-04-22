import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import { FaStar as StarIcon } from "react-icons/fa";

import Button from "@components/base/Button";
import Searchbar from "@features/search-bar";

const Toolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isFavoritesPage = pathname === "/favorites";

  const handleNewProductbtn = () => {
    router.push("/new-product");
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
      <Searchbar />
      <div className="flex w-full items-center justify-end gap-4 md:w-1/4">
        <Button size="lg" onClick={handleNewProductbtn}>
          New Product
        </Button>
        <Link href={isFavoritesPage ? "/" : "/favorites"}>
          <div className="flex size-10 items-center justify-center rounded-md border-2 border-brand">
            {isFavoritesPage ? (
              <HomeIcon className="w-full fill-brand" />
            ) : (
              <StarIcon className="w-full fill-brand" />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;
