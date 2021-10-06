import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log('allexceptions!');

    if (exception instanceof HttpException) {
      if (request.path.slice(1) === 'NODE_ENV' || !process.env[request.path.slice(1)]) {
        response
        .status(502)
        .json({
          statusCode: 502,
          path: request.url,
          message: 'Cannot process request'
        });
        return;
      }
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(status);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        console.log(request.path.slice(1));
        console.log('filtered!');

        if (request.path.slice(1) === 'NODE_ENV' || !process.env[request.path.slice(1)]) {
          response
          .status(502)
          .json({
            statusCode: 502,
            path: request.url,
            message: 'Cannot process request'
          });
          return;
        }

        response
          .status(status)
          .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
          });
    }
}
