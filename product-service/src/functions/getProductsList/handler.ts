import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from 'src/services/products';
import { STATUS_CODES } from '@libs/const';

export const getProductsList: APIGatewayProxyHandler = async () => {
    try {
        const service = new ProductsService();
        return formatJSONResponse(
            await service.getProductsList()
        );
    } catch (error) {
        return formatJSONResponse({
            body: `Something bad has happened: ${JSON.stringify(error)}`
        }, STATUS_CODES.BAD_REQUEST);
    }
}

export const main = middyfy(getProductsList);
