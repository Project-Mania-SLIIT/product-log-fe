import Request from "@utils/request";

/** POST - '/product' - create new product */
export const createNewProdcutFn = async (data: CreateNewProdcutData) => {
  const res = await Request({
    data,
    method: "post",
    url: "/product",
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
interface CreateNewProdcutData {
  name: string;
  description?: string;
  price: string;
  sku: string;
  images: {
    isFeatured: boolean;
    file: File;
  }[];
}

/** GET - '/product/all' - get all products */
export const getAllProductsFn = async () => {
  const res = await Request<AllProducts>({
    method: "get",
    url: "/product/all",
  });
  return res.data;
};
export type AllProducts = Array<{
  id: string;
  name: string;
  price: string;
  sku: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  images: Array<{
    id: string;
    data: string;
    contentType: string;
    filename: string;
    isFeatured: boolean;
    productId: string;
    createdAt: string;
    updatedAt: string;
  }>;
}>;

/** DELETE - '/product/:productId' - delete product */
export const deleteProductFn = async (productId: string) => {
  const res = await Request({
    method: "delete",
    url: `/product/${productId}`,
  });
  return res.data;
};

/** GET - '/product/:productId' - get product by id */
export const getProductByIdFn = async (productId: string) => {
  const res = await Request<AllProducts[0]>({
    method: "get",
    url: `/product/id/${productId}`,
  });
  return res.data;
};

/** PUT - '/product' - edit product */
export const editProductFn = async (data: EditProductData) => {
  const res = await Request<AllProducts[0]>({
    data,
    method: "put",
    url: "/product",
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
interface EditProductData {
  productId: string;
  name: string;
  description?: string;
  price: string;
  sku: string;
  images: {
    file?: File;
    isFeatured: boolean;
    isDeleted: boolean;
    isNew: boolean;
    imageId?: string;
  }[];
}
