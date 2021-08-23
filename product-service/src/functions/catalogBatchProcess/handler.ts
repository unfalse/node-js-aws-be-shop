import 'source-map-support/register';

import AWS from 'aws-sdk';

import { middyfy } from '@libs/lambda';

export const catalogBatchProcess = async (event) => {
  console.log('catalogBatchProcess lambda is executing', {
    records: event.Records
  });
  // const products = event.Records.map(({ body }) => body);
  // const sns = new AWS.SNS({ region: 'eu-west-1' });

};

export const main = middyfy(catalogBatchProcess);