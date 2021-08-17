import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

import { BUCKET, EXPIRES, UPLOADED } from '@libs/const';
import { importProductsFile } from 'src/functions/importProductsFile/handler';

describe('importProductsFile:', () => {
  it('should return url', async() => {
    const urlMock = ({ Bucket, Key, Expires, ContentType }) => `https://amazonaws.com/getObject?key=${Key}&bucket=${Bucket}&ContentType=${ContentType}&Expires=${Expires}`;

    AWSMock.setSDKInstance(AWS);

    AWSMock.mock('S3', 'getSignedUrl', async (operation: string, params: any, callback: Function) => {
      console.log('S3', 'getSignedUrl', 'mock called with parameters: ', {operation, params});
      callback(null, urlMock(params));
    });

    const params = {
      Bucket: BUCKET,
      Key: `${UPLOADED}productsmock.csv`,
      Expires: EXPIRES,
      ContentType: 'text/csv'
    };

    const response = await importProductsFile({queryStringParameters: { name: 'productsmock.csv' }});
    expect(response.body).toBe(urlMock(params));

    AWSMock.restore('S3');
  });
});
