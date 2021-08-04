import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES } from '@libs/const';

import { connect, getProductsList as getProductsListFromDb } from 'src/services/db';

export const getProductsList: APIGatewayProxyHandler = async () => {
    const client = await connect();
    try {
        const products = await getProductsListFromDb(client);
        return formatJSONResponse(products);
    } catch (error) {
        return formatJSONResponse({
            body: `Something bad has happened: ${JSON.stringify(error)}`
        }, STATUS_CODES.SERVER_ERROR);
    } finally {
        client.end();
    }
}

export const main = middyfy(getProductsList);
