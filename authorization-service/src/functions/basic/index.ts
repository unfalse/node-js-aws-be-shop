import { handlerPath } from '@libs/handlerResolver';

export const basicAuthorizer = {
  handler: `${handlerPath(__dirname)}/handler.main`
}
