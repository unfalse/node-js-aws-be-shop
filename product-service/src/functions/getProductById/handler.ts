import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES } from '@libs/const';

import { connect, getProductById as getProductByIdFromDb } from 'src/services/db';

export const getProductById: APIGatewayProxyHandler = async (event) => {
    const client = await connect();
    try {
        const { productId = '' } = event.pathParameters;
        const product = await getProductByIdFromDb(client, productId);
        if (product) {
            return formatJSONResponse(product);
        }
        return formatJSONResponse({
            body: 'Product not found'
        }, STATUS_CODES.NOT_FOUND);
    } catch (error) {
        return formatJSONResponse({
            body: `Something bad has happened: ${JSON.stringify(error)}`
        }, STATUS_CODES.BAD_REQUEST);
    } finally {
        client.end();
    }
}

export const main = middyfy(getProductById);
