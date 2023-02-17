import { AxiosResponse } from "axios";
import {
  getGeneratedProductDescription,
  getProducts,
  GetProductsResponse,
  PagingQueryParams,
  updateProduct,
} from "../../api/products/products.api";
import { Product } from "../../api/products/products.model";
import { ProductListItem } from "../../components/ProductList/ProductList.model";
import {
  currentDateMinusOneMonth,
  getQueryParamString,
  removeHtmlTags,
} from "../../utils/functions";

export function getPagingQueryParams(
  paging: PagingQueryParams
): PagingQueryParams {
  return {
    next: getQueryParamString(paging.next),
    previous: getQueryParamString(paging.previous),
  };
}

export function getProductListItem(
  product: Product,
  checked: boolean
): ProductListItem {
  return {
    ...product,
    body_html: removeHtmlTags(product.body_html),
    checked,
  };
}

export function getProductListItems(
  products: Product[],
  checked: boolean
): ProductListItem[] {
  if (!products?.length) return [];
  return products.map((product) => getProductListItem(product, checked));
}

export const getProductsByQuery = async (
  query: string
): Promise<GetProductsResponse> => {
  const response: AxiosResponse<GetProductsResponse> = await getProducts(
    currentDateMinusOneMonth(),
    query
  );
  return response.data;
};

export const getProductDescription = async (
  description: string
): Promise<string> => {
  const response = await getGeneratedProductDescription(description);
  return response.data;
};

export const updateSingleProduct = async (
  product: ProductListItem,
  description: string
): Promise<Product> => {
  const collectionDate = currentDateMinusOneMonth();
  const response = await updateProduct(collectionDate, product.id, {
    ...product,
    body_html: description,
  });
  return response.data;
};
