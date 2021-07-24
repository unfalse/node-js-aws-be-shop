import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from '@services/products';
import { STATUS_CODES } from '@libs/const';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
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
