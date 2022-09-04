import { Injectable, LoggerService } from '@nestjs/common';
import { CustomLogger } from './custom-logger';

import * as winston from 'winston';

@Injectable()
export class CustomLoggerService implements LoggerService {
	logger: winston.Logger;

	constructor(private customLogger: CustomLogger) {
		this.logger = this.customLogger.createLoggerInstance();
	}

	log(message: string, payload?: object) {
		this.logger.info(message, payload);
	}

	error(message: string, payload?: object) {
		this.logger.error(message, payload);
	}

	warn(message: string, payload?: object) {
		this.logger.warn(message, payload);
	}

	debug(message: string, payload?: object) {
		this.logger.debug(message, payload);
	}

	verbose(message: string, payload?: object) {
		this.logger.notice(message, payload);
	}
}
