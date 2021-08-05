import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { v4 } from 'uuid';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES } from '@libs/const';

import { addProduct as addProductToDb } from 'src/services/db';

interface Product {
    id: string;
    title: string;
    description: string;
    img_url: string;
    price: number;
}

export const addProduct: APIGatewayProxyHandler = async (event) => {
    try {
        console.log('event.body = ', event.body);
        const product: Product = event.body as Product;
        product.id = v4();
        console.log('product = ', JSON.stringify(product));
        await addProductToDb(product);
        return formatJSONResponse({}, STATUS_CODES.OK);
    } catch (error) {
        console.log('Error at addProduct: ', error);
        return formatJSONResponse({
            body: `Something bad has happened: ${JSON.stringify(error)}`
        }, STATUS_CODES.SERVER_ERROR);
    }
}

export const main = middyfy(addProduct);
