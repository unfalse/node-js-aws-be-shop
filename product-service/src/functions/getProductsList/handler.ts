import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getProductsList as getProductsListFromDb } from 'src/services/db';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
    console.log('getProductsList lambda is executing', {
        method: event.httpMethod,
        pathParameters: event.pathParameters,
        body: event.body
    });
    try {
        const products = await getProductsListFromDb();
        return formatJSONResponse(products);
    } catch (error) {
        throw error;
    }
}

export const main = middyfy(getProductsList);
