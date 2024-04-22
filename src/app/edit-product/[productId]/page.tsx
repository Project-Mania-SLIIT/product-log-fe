"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { FcAddImage as AddImageIcon } from "react-icons/fc";
import { IoCloseSharp as DeleteIcon } from "react-icons/io5";
import { PiShootingStarFill as FeaturedIcon } from "react-icons/pi";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { favoriteProductActions } from "@/store/favorite-products/slice";
import Navbar from "@components/app/navbar";
import PageTitle from "@components/app/page-title";
import Button from "@components/base/Button";
import FormErrorMessage from "@components/base/form/ErrorMessage";
import Input from "@components/base/form/Input";
import Label from "@components/base/form/Label";
import Textarea from "@components/base/form/Textarea";
import Spinner from "@components/base/Spinner";
import { Toast } from "@components/base/Toast";
import { cn } from "@utils/className";
import { editProductFn, getProductByIdFn } from "@utils/endpoints";

interface SelectedImage {
  file?: File;
  imageId?: string;
  preview: string;
  isFeatured: boolean;
  isDeleted: boolean;
  isNew: boolean;
}

const MAX_IMAGE_SIZE = 2; // MB
const MAX_IMAGES_COUNT = 3;

const EditProductRoute = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({ mutationFn: editProductFn });

  const productInfo = useQuery({
    queryFn: () => getProductByIdFn(productId),
    queryKey: ["get-product", productId],
    enabled: !!productId,
  });

  const initialImages: SelectedImage[] | undefined =
    productInfo?.data?.images?.map(({ data, isFeatured, id }) => {
      return {
        isFeatured,
        imageId: id,
        isNew: false,
        preview: data,
        file: undefined,
        isDeleted: false,
      };
    });

  const { handleChange, values, handleSubmit, setFieldValue, touched, errors } =
    useFormik({
      initialValues: {
        sku: productInfo.data?.sku ?? "",
        name: productInfo.data?.name ?? "",
        price: productInfo.data?.price ?? "",
        description: productInfo.data?.description ?? "",
        images: initialImages ?? [],
      },
      enableReinitialize: true,
      validationSchema,
      validateOnBlur: true,
      validateOnChange: true,
      onSubmit: (values) => {
        if (productId)
          mutate(
            {
              ...values,
              productId,
              images: values?.images?.map(
                ({ isDeleted, isFeatured, isNew, file, imageId }) => {
                  return { isDeleted, isFeatured, isNew, file, imageId };
                },
              ),
            },
            {
              onSuccess: ({ id, sku, price, name, images }) => {
                const image = images?.filter(({ isFeatured }) => isFeatured)[0]
                  ?.data;
                queryClient.invalidateQueries({ queryKey: ["all-products"] });
                dispatch(
                  favoriteProductActions.updateProduct({
                    id,
                    sku,
                    name,
                    price,
                    image,
                  }),
                );
                Toast.success("Product updated successfully");
                router.push("/");
              },
              onError: () => {
                Toast.error("Failed to update product");
              },
            },
          );
      },
    });

  const selectedImages = values.images;
  const setSelectedImages = (images: SelectedImage[]) => {
    setFieldValue("images", images);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files[0]?.size > MAX_IMAGE_SIZE * 1024 * 1024) {
      alert(`Image size should be less than ${MAX_IMAGE_SIZE}MB`);
      return;
    }

    const newImage = {
      file: files[0],
      preview: URL.createObjectURL(files[0]),
      isFeatured: selectedImages?.length === 0,
      isNew: true,
      isDeleted: false,
    };

    setSelectedImages([...selectedImages, newImage]);
  };

  const makeImageFeatured = (index: number) => {
    const newImages = selectedImages.map((image, i) => {
      return {
        ...image,
        isFeatured: i === index,
      };
    });
    setSelectedImages(newImages);
  };

  const removeImage = (index: number) => {
    if (selectedImages[index].isNew) {
      const newImages = selectedImages.filter((_, i) => i !== index);
      setSelectedImages(newImages);
      return;
    } else {
      const newImages = selectedImages
        .filter(({ isDeleted }) => !isDeleted)
        .map((image, i) => {
          return {
            ...image,
            isDeleted: i === index,
          };
        });
      setSelectedImages(newImages);
    }
  };

  const imageCountWithoutDeletes = selectedImages.filter(
    ({ isDeleted }) => !isDeleted,
  ).length;

  return (
    <main className="container h-full max-w-screen-lg px-4">
      <Navbar />
      <PageTitle primaryTitle="Products" secondaryTitle="Edit Product" />

      {productInfo.isPending && (
        <div className="flex h-[35vh] w-full items-center justify-center">
          <Spinner className="text-3xl" />
        </div>
      )}

      <div
        className={cn("space-y-6 py-6 md:space-y-10 md:py-10", {
          hidden: productInfo.isPending,
        })}
      >
        <div className="space-y-4">
          <div className="flex w-full items-center gap-4 md:w-1/2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              placeholder="#CA34"
              value={values.sku}
              onChange={handleChange}
            />
          </div>
          <FormErrorMessage
            message={touched.sku && errors.sku ? errors.sku : undefined}
          />
        </div>

        <div className="flex flex-col items-start justify-center gap-6 md:flex-row md:gap-10">
          <div className="w-full flex-1 space-y-4 md:w-auto">
            <div className="flex items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Amazing prodcut"
              />
            </div>
            <FormErrorMessage
              message={touched.name && errors.name ? errors.name : undefined}
            />
          </div>

          <div className="w-full flex-1 space-y-4 md:w-auto">
            <div className="flex items-center gap-4">
              <Label htmlFor="price">Price</Label>
              <Input
                min={1}
                id="price"
                max={99999}
                type="number"
                value={values.price}
                onChange={handleChange}
                placeholder="25$"
              />
            </div>
            <FormErrorMessage
              message={touched.price && errors.price ? errors.price : undefined}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="description">Product Description</Label>
          <Label htmlFor="description" className="text-sm text-textSecondary">
            Write a small description about the product
          </Label>
          <Textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            className="mt-2 min-h-32"
            placeholder="This product is amazing because..."
          />
          <FormErrorMessage
            message={
              touched.description && errors.description
                ? errors.description
                : undefined
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Product Images</Label>
            <Label className="text-sm leading-tight text-textSecondary">
              JPEG, PNG or SVG (Maximum file size {MAX_IMAGE_SIZE}MB)
            </Label>
            {typeof errors.images === "string" && (
              <FormErrorMessage
                message={
                  touched.images && errors.images ? errors.images : undefined
                }
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            {selectedImages?.length > 0 && (
              <div className="flex select-none items-center gap-4">
                {selectedImages
                  ?.filter(({ isDeleted }) => !isDeleted)
                  ?.map(({ preview, isFeatured }, idx) => (
                    <div key={idx} className="relative">
                      <div
                        onClick={() => makeImageFeatured(idx)}
                        className={cn(
                          "cursor-pointer overflow-hidden rounded-md border-2 border-transparent p-0.5 hover:border-brand",
                          {
                            "border-yellow-500 hover:border-yellow-500":
                              isFeatured,
                          },
                        )}
                      >
                        <img
                          src={preview}
                          alt={`prodcut-${idx}`}
                          className="size-20 rounded-md object-cover"
                        />
                      </div>

                      {!isFeatured && (
                        <div
                          onClick={() => removeImage(idx)}
                          className="absolute right-0 top-0 cursor-pointer rounded-full bg-rose-500 p-0.5 text-white hover:bg-rose-700"
                        >
                          <DeleteIcon className="size-4" />
                        </div>
                      )}

                      {isFeatured && (
                        <div className="absolute inset-0 z-20 -mb-3 flex items-end justify-center">
                          <div className="flex size-6 items-center justify-center rounded-full bg-yellow-500">
                            <FeaturedIcon className="size-4 fill-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {imageCountWithoutDeletes < MAX_IMAGES_COUNT && (
              <div>
                <input
                  type="file"
                  id="images"
                  name="images"
                  className="hidden"
                  onChange={(e) => {
                    handleImageChange(e);
                    e.target.value = "";
                  }}
                  accept="image/png, image/jpeg, image/svg"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <div className="flex size-20 items-center justify-center rounded-md border border-dashed border-textSecondary bg-bgSecondary active:border-textPrimary">
                    <AddImageIcon className="text-2xl" />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {!productInfo.isPending && (
        <div className="flex w-full items-center justify-end pb-10">
          <Button
            size="lg"
            type="submit"
            disabled={isPending}
            showSpinner={isPending}
            onClick={() => handleSubmit()}
          >
            Update Product
          </Button>
        </div>
      )}
    </main>
  );
};

export default EditProductRoute;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required("Name is required")
    .trim()
    .min(1)
    .max(45),

  description: Yup.string()
    .label("Description")
    .optional()
    .trim()
    .min(0)
    .max(255),

  price: Yup.number()
    .label("Price")
    .required("Price is required")
    .min(1)
    .max(99999999999),

  sku: Yup.string()
    .label("SKU")
    .required("SKU is required")
    .trim()
    .min(1)
    .max(45),

  images: Yup.array()
    .required("At least one image is required")
    .min(1, "At least one image is required")
    .max(MAX_IMAGES_COUNT),
});
