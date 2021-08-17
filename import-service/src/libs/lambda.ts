import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { corsMiddleware } from 'src/middlewares/cors';
import { errorsHandler } from 'src/middlewares/errors';

export const middyfy = 
  (handler) => 
    middy(handler)
    .use(middyJsonBodyParser())
    .use(errorsHandler())
    .use(corsMiddleware());
