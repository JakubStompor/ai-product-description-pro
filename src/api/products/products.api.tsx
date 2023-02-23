import axios, { AxiosResponse } from "axios";
import { API_CREDENTIALS } from "../credentials";
import { Product } from "./products.model";

export interface PagingQueryParams {
  previous: Object | string;
  next: Object | string;
}
export interface GetProductsResponse {
  paging: PagingQueryParams;
  products: Product[];
}

export async function getProducts(
  productsCollectionDate: string,
  query: string
): Promise<AxiosResponse<GetProductsResponse>> {
  let queryString = `${query}`;
  if (!query) {
    queryString = "";
  }
  return axios.get<GetProductsResponse>(
    `${API_CREDENTIALS.host}/products/${productsCollectionDate}?${queryString}`
  );
}

export async function updateProduct(
  productsCollectionDate: string,
  productId: number,
  product: Product
): Promise<AxiosResponse<Product>> {
  return axios<Product>({
    method: "put",
    url: `${API_CREDENTIALS.host}/products/${productsCollectionDate}/${productId}`,
    data: {
      product: product,
    },
  });
}

export async function getGeneratedProductDescription(
  currentProductDescription: string
): Promise<AxiosResponse<string>> {
  return axios<string>({
    method: "post",
    url: `${API_CREDENTIALS.host}/ai/productDescription`,
    data: {
      currentProductDescription: currentProductDescription,
    },
  });
}
