import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

import { Response } from 'express';

@Catch()
export class HttpProxyErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // Throttler
    if (
      exception instanceof ThrottlerException ||
      exception.name === 'ThrottlerException'
    ) {
      return res.status(429).json({
        statusCode: 429,
        error: 'ThrottlerException',
        message: 'Too many requests. Please try again later.',
      });
    }

    // HttpException NestJS standard
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      return res.status(status).json(response);
    }

    // Errors originating from Axios or other proxies
    const response = exception?.response;
    if (response) {
      const finalResponse =
        typeof response === 'string'
          ? {
              message: response,
              statusCode: HttpStatus.BAD_GATEWAY,
              error: 'GatewayError',
            }
          : {
              message:
                response.message ||
                response.data.message ||
                response.error ||
                'Gateway error',
              statusCode:
                response.statusCode ||
                response.data.statusCode ||
                HttpStatus.BAD_GATEWAY,
              error: response.error || response.data.error || 'GatewayError',
            };

      return res.status(finalResponse.statusCode as number).json(finalResponse);
    }

    // Fallback
    return res.status(HttpStatus.BAD_GATEWAY).json({
      statusCode: HttpStatus.BAD_GATEWAY,
      message: 'Internal gateway error.',
      error: 'GatewayError',
    });
  }
}
