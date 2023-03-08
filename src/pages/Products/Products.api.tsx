import {
  GetProductsResponseDto,
  ShopifyProductsService,
  OpenAiService,
  ProductDto,
  GetAiProductDescriptionDto,
} from "../../api";
import { ProductListItem } from "../../components/ProductList/ProductList.model";
import { currentDateMinusOneMonth } from "../../utils/functions";

export const getProductsByQuery = async (
  collectionDate: string,
  productsQuerySearchParams: string
): Promise<GetProductsResponseDto> => {
  const response: GetProductsResponseDto =
    await ShopifyProductsService.productsControllerGetProducts(
      collectionDate,
      productsQuerySearchParams
    );
  return response;
};

export const getProductDescription = async (
  requestBody: GetAiProductDescriptionDto
): Promise<string> => {
  const response: string =
    await OpenAiService.aiControllerGetProductDescription(requestBody);
  return response;
};

export const updateSingleProduct = async (
  product: ProductListItem,
  description: string
): Promise<ProductDto> => {
  const collectionDate = currentDateMinusOneMonth();
  const response: ProductDto =
    await ShopifyProductsService.productsControllerUpdateProduct(
      collectionDate,
      product.id,
      {
        ...product,
        body_html: description,
      }
    );
  return response;
};
