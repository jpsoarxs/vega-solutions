import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	getHello(): object {
		return {
			name: 'NestJS API - Desafio',
			version: '1.0.0',
		};
	}
}
