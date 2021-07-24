import { STATUS_CODES } from '@libs/const';

export const formatJSONResponse = (response: Record<string, unknown> | Array<unknown>, statusCode = STATUS_CODES.OK) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Method': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  }
}
