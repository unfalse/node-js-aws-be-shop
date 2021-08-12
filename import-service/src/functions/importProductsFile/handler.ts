import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES } from '@libs/const';

export const importProductsFile: APIGatewayProxyHandler = async (event) => {
    console.log('importProductsFile lambda is executing', {
        method: event.httpMethod,
        pathParameters: event.pathParameters,
        body: event.body
    });

    return formatJSONResponse({}, STATUS_CODES.OK);
}

export const main = middyfy(importProductsFile);
