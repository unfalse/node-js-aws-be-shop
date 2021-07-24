import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as mockContext from 'aws-lambda-mock-context';
import { mockProducts } from '../mocks/products';

import { getProductsList } from '../functions/getProductsList/handler';
import { STATUS_CODES } from '../libs/const';

describe('getProductsList handler', () => {
    const ctx = mockContext.default();
    const cb = () => null;

    it('should return an array of products', async () => {
        const response = (await getProductsList({} as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(STATUS_CODES.OK);
        expect(body).toEqual(expect.arrayContaining(mockProducts));
    });
});