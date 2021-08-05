import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES } from '@libs/const';

import { getProductsList as getProductsListFromDb } from 'src/services/db';

export const getProductsList: APIGatewayProxyHandler = async () => {
    try {
        const products = await getProductsListFromDb();
        return formatJSONResponse(products);
    } catch (error) {
        return formatJSONResponse({
            body: `Something bad has happened: ${JSON.stringify(error)}`
        }, STATUS_CODES.SERVER_ERROR);
    }
}

export const main = middyfy(getProductsList);
