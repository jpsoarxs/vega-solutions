import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as winston from 'winston';

@Injectable()
export class CustomLogger {
	constructor(private configService: ConfigService) {}

	createLoggerInstance(): winston.Logger {
		const alignColorsAndTime = winston.format.combine(
			winston.format.colorize({
				all: true,
			}),
			winston.format.label({
				label: '[LOGGER]',
			}),
			winston.format.timestamp({
				format: 'YY-MM-DD HH:mm:ss',
			}),
			winston.format.printf(
				(info) =>
					` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
			),
		);

		return winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			defaultMeta: { service: 'user-service' },
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.colorize(),
						alignColorsAndTime,
					),
				}),
			],
		});
	}
}
