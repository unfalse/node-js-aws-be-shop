import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

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
    console.log('addProduct lambda is executing', {
        method: event.httpMethod,
        pathParameters: event.pathParameters,
        body: event.body
    });

    try {
        const product = (event.body as Object) as Product;
        await addProductToDb(product);
        return formatJSONResponse({}, STATUS_CODES.OK);
    } catch (error) {
        console.log('Error at addProduct: ', error);
        throw error;
    }
}

export const main = middyfy(addProduct, [{
        type: "body",
        parameter: "title",
        errorMessage: "title is a required field",
        validationFunction: (title: string) => typeof title === "string" && title.length > 0,
    },
    {
        type: "body",
        parameter: "price",
        errorMessage: "price must be non negative integer",
        validationFunction: (price: number) => typeof price === 'number' && Number.isInteger(price) && price >= 0,
    },
    {
        type: "body",
        parameter: "description",
        errorMessage: "description must be string or null",
        validationFunction: (description: string) => typeof description === 'string' || !description,
    },
    {
        type: "body",
        parameter: "img_url",
        errorMessage: "img_url must be string or null",
        validationFunction: (img_url: string) => typeof img_url === 'string' || !img_url,
    },
    {
        type: "body",
        parameter: "count",
        errorMessage: "count must be non-negative integer or null",
        validationFunction: (count: number) => (
            typeof count === 'number' && Number.isInteger(count) && count >= 0) ||
            (count === null || count === undefined),
    },
]);
