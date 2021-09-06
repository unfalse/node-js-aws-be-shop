import AWS from 'aws-sdk';

import { getSNSTopicArn } from '../../../variables';

export class Publisher {

  sns: AWS.SNS;

  constructor() {
    this.sns = new AWS.SNS({ region: 'eu-west-1' });
  }

  publish(product) {
    this.sns.publish({
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
  };

}