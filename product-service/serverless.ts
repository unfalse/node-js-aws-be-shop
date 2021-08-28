import type { AWS } from '@serverless/typescript';

import {
  getProductsList,
  getProductById,
  addProduct,
  catalogBatchProcess
} from '@functions/index';
import { QUEUE } from '@libs/const';

import { getDatabaseCredentials } from './variables';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    }
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: {
        'Ref': 'SQSQueue'
      },
      SNS_TOPIC_ARN: {
        'Ref': 'SNSTopic'
      },
      ...getDatabaseCredentials()
    },
    lambdaHashingVersion: '20201221',
    stage: 'dev',
    region: 'eu-west-1',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: 'sqs:*',
            Resource: {
              'Fn::GetAtt': [
                'SQSQueue',
                'Arn'
              ]
            }
          },
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: {
              'Ref': 'SNSTopic'
            }
          }
        ]
      }
    }
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: QUEUE
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${env:PRIMARY_EMAIL}',
          Protocol: 'email',
          TopicArn: { 'Ref': 'SNSTopic' },
          FilterPolicy: {
            isXiaomi: ['false']
          }
        }
      },
      FilteredSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${env:ADDITIONAL_EMAIL}',
          Protocol: 'email',
          TopicArn: { 'Ref': 'SNSTopic' },
          FilterPolicy: {
            isXiaomi: ['true']
          }
        }
      }
    },
    Outputs: {
      QueueURL: {
        Value: {
          'Ref': 'SQSQueue'
        }
      },
      QueueARN: {
        Value: {
          "Fn::GetAtt": [
            "SQSQueue",
            "Arn"
          ]
        }
      }
    }
  },
  // import the function via paths
  functions: { getProductsList, getProductById, addProduct, catalogBatchProcess },
};

module.exports = serverlessConfiguration;
