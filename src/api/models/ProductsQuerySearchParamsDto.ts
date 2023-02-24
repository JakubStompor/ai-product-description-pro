/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProductsQuerySearchParamsDto = {
    api_version?: string;
    collection_id?: string;
    created_at_max?: string;
    created_at_min?: string;
    fields?: string;
    handle?: string;
    ids?: string;
    limit?: number;
    presentment_currencies?: string;
    product_type?: string;
    published_at_max?: string;
    published_at_min?: string;
    published_status?: ProductsQuerySearchParamsDto.published_status;
    since_id?: string;
    status?: ProductsQuerySearchParamsDto.status;
    title?: string;
    updated_at_max?: string;
    updated_at_min?: string;
    vendor?: string;
    order?: string;
};

export namespace ProductsQuerySearchParamsDto {

    export enum published_status {
        PUBLISHED = 'published',
        UNPUBLISHED = 'unpublished',
        ANY = 'any',
    }

    export enum status {
        ACTIVE = 'active',
        ARCHIVED = 'archived',
        DRAFT = 'draft',
    }


}

