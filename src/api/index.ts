/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { GetAiProductDescriptionDto } from './models/GetAiProductDescriptionDto';
export type { GetProductsResponseDto } from './models/GetProductsResponseDto';
export type { ProductDto } from './models/ProductDto';
export type { ProductImageDto } from './models/ProductImageDto';
export type { ProductOptionDto } from './models/ProductOptionDto';
export type { ProductPagingDto } from './models/ProductPagingDto';
export { ProductsQuerySearchParamsDto } from './models/ProductsQuerySearchParamsDto';
export type { ProductVariantDto } from './models/ProductVariantDto';

export { OpenAiService } from './services/OpenAiService';
export { ShopifyProductsService } from './services/ShopifyProductsService';
