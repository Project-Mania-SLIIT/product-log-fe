"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiErrorWarningFill as WarningIcons } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { favoriteProductActions } from "@/store/favorite-products/slice";
import { selectDeleteProductInfo } from "@/store/products/selectors";
import { productActions } from "@/store/products/slice";
import AlertDialog from "@components/base/alert-dialog";
import { Toast } from "@components/base/Toast";
import { AllProducts, deleteProductFn } from "@utils/endpoints";

const DeleteProduct = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { productId, showDeleteProductModal } = useSelector(
    selectDeleteProductInfo,
  );

  const { mutate, isPending } = useMutation({ mutationFn: deleteProductFn });

  const handleDelete = () => {
    productId &&
      mutate(productId, {
        onSuccess: () => {
          queryClient.setQueryData(["all-products"], (oldData: AllProducts) => {
            return oldData.filter((product) => product.id !== productId);
          });
          dispatch(
            favoriteProductActions.removeProductFromFavorite({ productId }),
          );
          Toast.success("Product deleted successfully");
        },
        onError: () => {
          Toast.error("Failed to delete product");
        },
        onSettled: () => {
          dispatch(productActions.setShowDeleteProductModal(false));
          dispatch(productActions.setProductIdToDelete({ productId: "" }));
        },
      });
  };

  const handleCancel = () => {
    dispatch(productActions.setShowDeleteProductModal(false));
    dispatch(productActions.setProductIdToDelete({ productId: "" }));
  };

  return (
    <AlertDialog
      title="ARE YOU SURE?"
      onCancel={handleCancel}
      onAction={handleDelete}
      actionText="Delete Product"
      actionInProgress={isPending}
      open={showDeleteProductModal}
      actionDisabled={isPending || !productId}
      icon={<WarningIcons className="text-5xl text-rose-600" />}
      description="You will not be able to undo this action if you proceed!"
    />
  );
};

export default DeleteProduct;
