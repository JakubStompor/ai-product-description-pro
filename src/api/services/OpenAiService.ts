/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetAiProductDescriptionDto } from '../models/GetAiProductDescriptionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OpenAiService {

    /**
     * Get generated product descriptions by ChatGPT
     * @param requestBody
     * @returns string
     * @throws ApiError
     */
    public static aiControllerGetProductDescription(
        requestBody: GetAiProductDescriptionDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai/productDescription',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
