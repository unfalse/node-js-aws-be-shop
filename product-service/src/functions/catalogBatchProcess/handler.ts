import 'source-map-support/register';

import { SQSEvent } from 'aws-lambda';

import { Publisher } from '@services/sns';
import { middyfy } from '@libs/lambda';
import { addProductToDb } from 'src/services/db';

export const catalogBatchProcess = async (event: SQSEvent) => {
  console.log('catalogBatchProcess lambda is executing', {
    records: event.Records
  });

  const sns = new Publisher();

  const addedProducts = await Promise.all(event.Records.map(
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

      sns.publish(product);

      return product;
    }
  ));

  return addedProducts;
};

export const main = middyfy(catalogBatchProcess, null, true);
