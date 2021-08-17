import 'source-map-support/register';

import AWS from 'aws-sdk';

import { formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES, BUCKET, EXPIRES, UPLOADED } from '@libs/const';

export const importProductsFile = async (event) => {
    console.log('importProductsFile lambda is executing', {
        method: event.httpMethod,
        pathParameters: event.pathParameters,
        queryStrings: event.queryStringParameters,
        body: event.body
    });

    const { name } = event.queryStringParameters;
    
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    
    const params = {
        Bucket: BUCKET,
        Key: UPLOADED + name,
        Expires: EXPIRES,
        ContentType: 'text/csv'
    };

    return formatResponse(
        await s3.getSignedUrlPromise('putObject', params),
        STATUS_CODES.OK,
        false
    );
}

export const main = middyfy(importProductsFile);
