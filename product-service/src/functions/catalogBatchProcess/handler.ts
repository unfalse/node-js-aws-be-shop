import 'source-map-support/register';

import AWS from 'aws-sdk';
import { SQSEvent } from 'aws-lambda';

import { middyfy } from '@libs/lambda';

import { addProduct as addProductToDb } from 'src/services/db';
import { formatJSONResponse } from '@libs/apiGateway';
import { getSNSTopicArn } from 'variables';

export const catalogBatchProcess = async (event: SQSEvent) => {
  console.log('catalogBatchProcess lambda is executing', {
    records: event.Records
  });

  const sns = new AWS.SNS({ region: 'eu-west-1' });

  const addedProducts = event.Records.map(
    async ({ body, messageId }) => {
      const { title, price, description, img_url } = JSON.parse(body);
      
      console.log({messageId, title});
      
      const product = {
        title,
        price: Number(price),
        description,
        img_url
      };

      console.log(product);

      try {
        await addProductToDb(product);
      } catch(error) {
        console.log('addProductToDb fail: ', JSON.stringify(error));
      }

      console.log(`sending sns.publish (product.title = ${product.title})`);

      await sns.publish({
        Subject: 'New product has been added to db',
        Message: `The product has been added to the database: ${product.title}`,
        TopicArn: getSNSTopicArn(),
        MessageAttributes: {
          isXiaomi: {
            DataType: 'String',
            StringValue: (product.title.indexOf('Xiaomi') > 0).toString()
          }
        }
      },
      (error, data) => {
          console.log('sns.publish result: ', { error, data });
      });

      return product;
    }
  );

  return formatJSONResponse(addedProducts);
};

export const main = middyfy(catalogBatchProcess, null, true);
