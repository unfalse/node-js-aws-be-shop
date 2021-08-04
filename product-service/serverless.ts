import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductById } from '@functions/index';

import { getDatabaseCredentials } from './variables';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      ...getDatabaseCredentials()
    },
    lambdaHashingVersion: '20201221',
    stage: 'dev',
    region: 'eu-west-1'
  },
  // import the function via paths
  functions: { getProductsList, getProductById },
};

module.exports = serverlessConfiguration;
