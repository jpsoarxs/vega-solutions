import {
	INestApplication,
	ValidationPipe,
	VersioningType,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './infra';
import { HttpExceptionFilter } from './infra/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

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

	app.useLogger(CustomLoggerServiceApp);

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

	const configService = app.get(ConfigService);
	const port = configService.get('environment.port');

	CustomLoggerServiceApp.log(`Starting server on port ${port}`);
	await app.listen(port);
}

bootstrap();
