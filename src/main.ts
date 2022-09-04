import {
	INestApplication,
	ValidationPipe,
	VersioningType,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CustomLoggerService } from './infra';
import { HttpExceptionFilter } from './infra/filters/http-exception.filter';
import {
	DocumentBuilder,
	SwaggerCustomOptions,
	SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create<INestApplication>(AppModule, {
		bufferLogs: true,
	});

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	});

	const CustomLoggerServiceApp = app.get(CustomLoggerService);
	app.useGlobalFilters(new HttpExceptionFilter(CustomLoggerServiceApp));

	const configService = app.get(ConfigService);

	app.useLogger(CustomLoggerServiceApp);

	const rabbitUser = configService.get('rabbitmq.user');
	const rabbitPassword = configService.get('rabbitmq.pass');
	const rabbitHost = configService.get('rabbitmq.host');
	const rabbitPort = configService.get('rabbitmq.port');
	const rabbitQueueName = configService.get('rabbitmq.queueName');

	for (const queue of rabbitQueueName) {
		app.connectMicroservice<MicroserviceOptions>({
			transport: Transport.RMQ,
			options: {
				urls: [
					`amqp://${rabbitUser}:${rabbitPassword}@${rabbitHost}:${rabbitPort}`,
				],
				queue,
				queueOptions: {
					durable: true,
				},
				noAck: false,
				prefetchCount: 1,
			},
		});
	}

	app.setGlobalPrefix('api');

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: VERSION_NEUTRAL,
	});

	const swaggerOptions: SwaggerCustomOptions = {
		customSiteTitle: 'Desafio - Documentation',
		swaggerOptions: {
			persistAuthorization: true,
		},
	};

	const internalApi = new DocumentBuilder()
		.setTitle('Desafio API')
		.setDescription('')
		.setVersion('1.0')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
			'access_token',
		)
		.build();

	const documentInternal = SwaggerModule.createDocument(app, internalApi);
	SwaggerModule.setup('api/docs', app, documentInternal, swaggerOptions);

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.enableCors();

	await app.listen(3000);
}

bootstrap();
