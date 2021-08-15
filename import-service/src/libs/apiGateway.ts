import { STATUS_CODES } from '@libs/const';

export const formatJSONResponse = (...args) => formatResponse.apply(this, args);

export const formatResponse = (
  response: Record<string, unknown> | Array<unknown> | string = null,
  statusCode = STATUS_CODES.OK,
  formatJSON = true
) => ({
    statusCode,
    headers: {
      'Access-Control-Allow-Method': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: formatJSON ? JSON.stringify(response) : response
});
