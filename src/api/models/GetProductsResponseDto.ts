/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductDto } from './ProductDto';
import type { ProductPagingDto } from './ProductPagingDto';

export type GetProductsResponseDto = {
    products: Array<ProductDto>;
    paging: ProductPagingDto;
};

