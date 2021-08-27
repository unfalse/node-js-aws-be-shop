import 'source-map-support/register';

import AWS from 'aws-sdk';

import { middyfy } from '@libs/lambda';

import { addProduct as addProductToDb } from 'src/services/db';

export const catalogBatchProcess = async (event) => {
  console.log('catalogBatchProcess lambda is executing', {
    records: event.Records
  });

  const sns = new AWS.SNS({ region: 'eu-west-1' });
  const sqs = new AWS.SQS();
  
  event.Records.map(
    async ({ body, receiptHandle }) => {
      const { title, price, description, img_url } = JSON.parse(body);
      console.log({ title, price, description, img_url });
      console.log(Number(price));
      const product = {
        title,
        price: Number(price),
        description,
        img_url
      };

      console.log(product);

      await addProductToDb(product);

      await sns.publish({
        Subject: 'New product has been added to db',
        Message: `The product has been added to the database: ${product.title}`,
        TopicArn: process.env.SNS_TOPIC_ARN
      }).promise();

      console.log('deleting messages!');

      await sqs.deleteMessage({
        QueueUrl: process.env.SQS_URL,
        ReceiptHandle: receiptHandle
      }, (error, data) => {
        if (error) {
          console.log('Error happened while deleting the message: ', error);
        }
        console.log('sqs.deleteMessage data: ', data);
      });
    }
  );
};

export const main = middyfy(catalogBatchProcess);