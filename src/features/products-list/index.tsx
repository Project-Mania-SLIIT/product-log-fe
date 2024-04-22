import { useRouter } from "next/navigation";
import { AiFillDelete as DeleteIcon } from "react-icons/ai";
import {
  FaStar as StarIconFill,
  FaRegStar as StarIconLine,
} from "react-icons/fa";
import { MdModeEdit as EditIcon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { selectFavoriteProducts } from "@/store/favorite-products/selectors";
import { favoriteProductActions } from "@/store/favorite-products/slice";
import { productActions } from "@/store/products/slice";
import Spinner from "@components/base/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/base/Table";
import DeleteProduct from "@features/delete-product";
import { cn } from "@utils/className";

interface Props {
  data?: ProductItem[];
  loading?: boolean;
}

export interface ProductItem {
  id: string;
  price: string;
  sku: string;
  image: string;
  name: string;
}

const ProductsList = ({ data, loading = false }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const toggleFavoriteStatus = (product: ProductItem) => {
    dispatch(favoriteProductActions.toggleFavoriteStatus(product));
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(productActions.setProductIdToDelete({ productId }));
    dispatch(productActions.setShowDeleteProductModal(true));
  };

  const handleEditProduct = (productId: string) => {
    router.push(`/edit-product/${productId}`);
  };

  const titleClassName =
    "font-medium text-brand text-start whitespace-nowrap text-nowrap flex-nowrap";
  return (
    <div className="py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={cn(titleClassName)}>SKU</TableHead>
            <TableHead className={cn(titleClassName)}>IMAGE</TableHead>
            <TableHead className={cn(titleClassName)}>PRODUCT NAME</TableHead>
            <TableHead className={cn(titleClassName)}>PRICE</TableHead>
            <TableHead className={cn(titleClassName, "w-[120px]")}> </TableHead>
          </TableRow>

          {loading && (
            <TableRow className="border-none">
              <TableHead colSpan={5}>
                <div className="flex h-[50vh] w-full items-center justify-center">
                  <Spinner className="text-3xl" />
                </div>
              </TableHead>
            </TableRow>
          )}
        </TableHeader>

        <TableBody>
          {data?.map((product) => {
            const { id, image, name, price, sku } = product;
            const isFavorite = favoriteProducts.find(
              ({ id: favoriteId }) => favoriteId === id,
            );
            return (
              <TableRow key={id} className="h-24">
                <TableCell className="text-textSecondary">{sku}</TableCell>
                <TableCell>
                  <img
                    alt={name}
                    src={image}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>${price}</TableCell>
                <TableCell>
                  <div className="flex select-none items-center justify-center gap-4">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDeleteProduct(id)}
                    >
                      <DeleteIcon className="size-5 fill-brand" />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleEditProduct(id)}
                    >
                      <EditIcon className="size-5 fill-brand" />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleFavoriteStatus(product)}
                    >
                      {isFavorite ? (
                        <StarIconFill className="size-5 fill-brand" />
                      ) : (
                        <StarIconLine className="size-5 fill-brand" />
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <DeleteProduct />
    </div>
  );
};

export default ProductsList;
