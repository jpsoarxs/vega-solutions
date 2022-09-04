import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../../use-cases';
import { UserRepository } from '../../infra/repositories';
import { UserV1Controller } from '../user-v1.controller';
import { CreateUserDto } from '../dto';
import { faker } from '@faker-js/faker';

describe('UserControllerV1', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateUserUseCase,
				{
					provide: UserRepository,
					useValue: {
						create: jest.fn((v) => v),
					},
				},
			],
			controllers: [UserV1Controller],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('/POST create customer', async () => {
		const customer: CreateUserDto = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const res = await request(app.getHttpServer()).post('/user').send(customer);

		expect(res.statusCode).toBe(201);
		expect(res.body.name).toBe(customer.name);
	});
});
