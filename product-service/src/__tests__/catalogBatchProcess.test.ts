import { mockProducts } from 'src/mocks/products';

import { catalogBatchProcess } from '../functions/catalogBatchProcess/handler';

import { Publisher } from '@services/sns';
import { addProductToDb } from '@services/db';

jest.mock('../services/db', () => {
  return {
      addProductToDb: jest.fn()
  };
});

jest.mock('@services/sns');

describe('catalogBatchProcess:', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process a message from SQS', async () => {

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

    // @ts-ignore
    const publisherInstance = Publisher.mock.instances[0];

    // @ts-ignore
    expect(addProductToDb.mock.calls[0].length).toBe(1);
    expect(publisherInstance.publish).toHaveBeenCalled();
  });

  it('should process several messages from SQS', async () => {

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
        },
        {
          body: JSON.stringify(mockProducts[1]),
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

    // @ts-ignore
    const publisherInstance = Publisher.mock.instances[0];

    // @ts-ignore
    expect(addProductToDb.mock.calls.length).toBe(2);
    expect(publisherInstance.publish).toHaveBeenCalledTimes(2);
  });

});