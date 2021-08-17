import type { AWS } from '@serverless/typescript';

import { importProductsFile, importFileParser } from '@functions/index';
import { BUCKET } from '@libs/const';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    s3BucketName: BUCKET
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    lambdaHashingVersion: '20201221',
    stage: 'dev',
    region: 'eu-west-1',
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "s3:ListBucket",
            Resource: [`arn:aws:s3:::${BUCKET}`],
          },
          {
            Effect: "Allow",
            Action: "s3:*",
            Resource: [`arn:aws:s3:::${BUCKET}/*`],
          },
        ]
      }
    }
  },
  resources: {
    Resources: {
      importStore: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: BUCKET,
          AccessControl: 'Private',
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedHeaders: ['*'],
                AllowedOrigins: ['*'],
                AllowedMethods: ['PUT'],
              }
            ]
          }
        }
      }
    },
    Outputs: {
      importStoreOutput: {
        Value: {
          Ref: 'importStore',
        }
      }
    }
  },
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
