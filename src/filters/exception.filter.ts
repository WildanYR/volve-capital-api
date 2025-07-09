/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode: HttpStatus;
    let errorMessage: string;
    let additionalInfo: any;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const { message, ...info } = exceptionResponse as any;
      errorMessage = message;
      additionalInfo = info;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal Server Error';
      this.logger.error(
        (exception as Error).message,
        (exception as Error).stack,
      );
    }
    const response: Response = ctx.getResponse();
    httpAdapter.reply(
      response,
      { message: errorMessage, ...additionalInfo },
      statusCode,
    );
  }
}
