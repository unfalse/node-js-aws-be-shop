import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as mockContext from 'aws-lambda-mock-context';

import { getProductById } from '../functions/getProductById/handler';
import { STATUS_CODES } from '../libs/const';

describe('getProductById lambda', () => {
    const ctx = mockContext.default();
    const cb = () => null;

    it('should return a product by given id', async () => {
        const event: Pick<APIGatewayProxyEvent, 'pathParameters'> = {
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'
            }
        };
        const response = (await getProductById(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;
        const body = JSON.parse(response.body);

        expect(response.statusCode).toBe(STATUS_CODES.OK);
        expect(body.title).toBe('Чайник BOSCH');
    });

    it('should return not found if there is no product with given id', async () => {
        const event: Pick<APIGatewayProxyEvent, 'pathParameters'> = {
            pathParameters: {
              productId: '1'
            }
        };
        const response = (await getProductById(event as APIGatewayProxyEvent, ctx, cb)) as APIGatewayProxyResult;

        expect(response.statusCode).toBe(STATUS_CODES.NOT_FOUND);
  });
});