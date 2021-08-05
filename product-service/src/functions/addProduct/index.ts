import { handlerPath } from '@libs/handlerResolver';

export const addProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/products',
        cors: true
      }
    }
  ]
}
