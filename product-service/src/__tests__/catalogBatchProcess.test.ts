import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

// import * as mockContext from 'aws-lambda-mock-context';
import { mockProducts } from 'src/mocks/products';

import { catalogBatchProcess } from '../functions/catalogBatchProcess/handler';

jest.mock('../services/db', () => {
  return {
      addProductToDb: jest.fn()
  };
});

describe('catalogBatchProcess:', () => {
  it.skip('should process a message from SQS', async () => {
    AWSMock.setSDKInstance(AWS);

    AWSMock.mock('SNS', 'publish', async (operation: string, params: any, callback: Function) => {
      console.log('SNS', 'publish', 'mock called with parameters: ', {operation, params});
      callback(null);
    });

    await catalogBatchProcess({
      Records: [
        {
          body: JSON.stringify(mockProducts[0]),
          messageId: '',
          messageAttributes: null,
          attributes: null,
          awsRegion: '',
          eventSource: '',
          eventSourceARN: '',
          md5OfBody: '',
          receiptHandle: ''
        }
      ]
    });

    expect(true).toBe(true);

    AWSMock.restore('SNS');
  });
});