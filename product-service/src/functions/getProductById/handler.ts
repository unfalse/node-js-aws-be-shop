import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES } from '@libs/const';

import { getProductById as getProductByIdFromDb } from 'src/services/db';

export const getProductById: APIGatewayProxyHandler = async (event) => {
    console.log('getProductById lambda is executing', {
        method: event.httpMethod,
        pathParameters: event.pathParameters,
        body: event.body
    });

    try {
        const { productId = '' } = event.pathParameters;
        const product = await getProductByIdFromDb(productId);
        if (product) {
            return formatJSONResponse(product);
        }
        return formatJSONResponse({
            body: 'Product not found'
        }, STATUS_CODES.NOT_FOUND);
    } catch (error) {
        throw error;
    }
}

export const main = middyfy(getProductById);
