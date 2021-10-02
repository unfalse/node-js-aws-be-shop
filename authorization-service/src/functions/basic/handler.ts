import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { getPasswordFromEnv, generatePolicy } from 'src/utils/index';

import { getCredentialsFromToken, getEffect } from 'src/utils/policy';

const basicAuthorizer = async (event, _context, lambdaCallback) => {
  console.log('basicAuthorizer lambda is executing', {
    event
  });
  
  if (event['type'] !== 'TOKEN') {
    lambdaCallback('Unauthorized');
    return null;
  }

  try {
    const { authorizationToken, methodArn } = event;
    const {encodedCreds='', username='', password=''} = getCredentialsFromToken(authorizationToken);

    console.log({ username, password });

    const storedUserPassword = getPasswordFromEnv(username);

    console.log({ storedUserPassword });

    const effect = getEffect(storedUserPassword, password);
    const policy = generatePolicy(encodedCreds, methodArn, effect);

    lambdaCallback(null, policy);

    return policy;
  } catch (error) {
    lambdaCallback(`Unauthorized due to error: ${error.message}`);
  }
}

export const main = middyfy(basicAuthorizer);
