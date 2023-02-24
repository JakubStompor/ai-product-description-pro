import { ProductDto, ProductPagingDto } from "../../api";
import { ProductListItem } from "../../components/ProductList/ProductList.model";
import { getQueryParamString, removeHtmlTags } from "../../utils/functions";

export function getPagingQueryParams(
  paging: ProductPagingDto
): ProductPagingDto {
  return {
    next: getQueryParamString(paging.next),
    previous: getQueryParamString(paging.previous),
  };
}

export function getProductListItem(
  product: ProductDto,
  checked: boolean
): ProductListItem {
  return {
    ...product,
    body_html: removeHtmlTags(product.body_html),
    checked,
  };
}

export function getProductListItems(
  products: ProductDto[],
  checked: boolean
): ProductListItem[] {
  if (!products?.length) return [];
  return products.map((product) => getProductListItem(product, checked));
}
