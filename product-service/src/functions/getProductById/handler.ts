import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { ProductsService } from 'src/services/products';
import { STATUS_CODES } from '@libs/const';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        const { productId = '' } = event.pathParameters;
        const service = new ProductsService();
        const product = await service.getProductById(productId);
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
    }
}

export const main = middyfy(getProductById);
