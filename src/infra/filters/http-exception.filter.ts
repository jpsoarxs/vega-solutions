import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from '../logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(private loggerService: CustomLoggerService) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus() || 500;
		const error = exception.getResponse();

		this.loggerService.error('Http exception filter', {
			url: request.url,
			body: request.body || null,
			query: request.query || null,
			params: request.params || null,
		});

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			error: error instanceof Error ? error.message : error,
		});
	}
}
