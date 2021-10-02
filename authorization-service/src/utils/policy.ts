export const generatePolicy = (principalId: string, resource: string, effect = 'Allow') => ({
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  });

export const getCredentialsFromToken = (authorizationToken: string) => {
  const [, encodedCreds = ''] = authorizationToken.split(' ');
  const buff = Buffer.from(encodedCreds, 'base64');
  const [username = '', password = ''] = buff.toString('utf-8').split(':');
  return {
    username,
    password,
    encodedCreds
  }
}

export const getEffect = (storedUserPassword: string, password: string) =>
  !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';