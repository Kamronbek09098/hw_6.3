import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // ValidationPipe puts the per-field error list into the response body,
    // exception.message is only the generic "Bad Request Exception".
    const body = exception.getResponse();
    const message =
      typeof body === 'object' && body !== null && 'message' in body
        ? (body as { message: string | string[] }).message
        : exception.message;

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
