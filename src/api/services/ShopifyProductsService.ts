/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetProductsResponseDto } from '../models/GetProductsResponseDto';
import type { ProductDto } from '../models/ProductDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ShopifyProductsService {

    /**
     * Get all products from Shopify shop
     * @param productsCollectionDate
     * @param productsQuerySearchParams
     * @returns GetProductsResponseDto
     * @throws ApiError
     */
    public static productsControllerGetProducts(
        productsCollectionDate: string,
        productsQuerySearchParams?: string,
    ): CancelablePromise<GetProductsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{productsCollectionDate}',
            path: {
                'productsCollectionDate': productsCollectionDate,
            },
            query: {
                'productsQuerySearchParams': productsQuerySearchParams,
            },
        });
    }

    /**
     * Update product in Shopify shop
     * @param productsCollectionDate
     * @param productId
     * @param requestBody
     * @returns ProductDto
     * @throws ApiError
     */
    public static productsControllerUpdateProduct(
        productsCollectionDate: string,
        productId: number,
        requestBody: ProductDto,
    ): CancelablePromise<ProductDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/products/{productsCollectionDate}/{productId}',
            path: {
                'productsCollectionDate': productsCollectionDate,
                'productId': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
