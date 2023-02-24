/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductImageDto } from './ProductImageDto';
import type { ProductOptionDto } from './ProductOptionDto';
import type { ProductVariantDto } from './ProductVariantDto';

export type ProductDto = {
    id: number;
    title: string;
    body_html: string;
    vendor: string;
    product_type: string;
    created_at: string;
    handle: string;
    updated_at: string;
    published_at: string;
    template_suffix: string;
    status: string;
    published_scope: string;
    tags: string;
    admin_graphql_api_id: string;
    variants: ProductVariantDto;
    options: ProductOptionDto;
    images: ProductImageDto;
    image: ProductImageDto;
};

