import 'source-map-support/register';

import { formatJSONResponse, formatResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getPasswordFromEnv, generatePolicy } from '@services/index';

import { STATUS_CODES } from '../../../../shared';

const basicAuthorizer = async (event) => {
  console.log('basicAuthorizer lambda is executing', {
    event
  });
  
  if (event['type'] != 'TOKEN') {
    return formatJSONResponse({}, STATUS_CODES.UNAUTHORIZED);
  }

  const { authorizationToken, methodArn } = event;
  const [, encodedCreds = ''] = authorizationToken.split(' ');
  const buff = Buffer.from(encodedCreds, 'base64');
  const [username = '', password = ''] = buff.toString('utf-8').split(':');
  
  console.log({ username, password });

  const storedUserPassword = getPasswordFromEnv(username);

  console.log({ storedUserPassword });

  const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
  const policy = generatePolicy(encodedCreds, methodArn, effect);
  
  return formatResponse(policy, effect === 'Allow' ? STATUS_CODES.OK : STATUS_CODES.FORBIDDEN);
}

export const main = middyfy(basicAuthorizer);
