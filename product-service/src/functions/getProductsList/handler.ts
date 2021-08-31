import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { getProductsListFromDb } from 'src/services/db';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
    console.log('getProductsList lambda is executing', {
        method: event.httpMethod,
        pathParameters: event.pathParameters,
        body: event.body
    });
    const products = await getProductsListFromDb();
    return formatJSONResponse(products);
}

export const main = middyfy(getProductsList);
