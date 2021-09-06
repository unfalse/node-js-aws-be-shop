import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

import { corsMiddleware } from 'src/middlewares/cors';
import { errorsHandler } from 'src/middlewares/errors';
import { validationMiddleware, ValidationRule } from 'src/middlewares/validation';

export const middyfy = 
  (handler, validationRules?: null | ValidationRule[], sqsEvent?: boolean) => {
    const result = middy(handler);
    
    result.use(middyJsonBodyParser());
    
    if (sqsEvent) {
      return result;
    }

    return result
      .use(errorsHandler())
      .use(corsMiddleware())
      .use(validationMiddleware(validationRules));
  }
