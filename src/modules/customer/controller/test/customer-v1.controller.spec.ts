import * as request from 'supertest';
import { INestApplication, CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerUseCase, ListCustomerUseCase } from '../../use-cases';
import { CustomerRepository } from '../../infra/repositories';
import { CustomerV1Controller } from '../customer-v1.controller';
import { CreateCustomerDto } from '../dto';
import { faker } from '@faker-js/faker';
import { StateEnum } from '../../entities/enum';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';

describe('CustomerControllerV1', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const mockGuard: CanActivate = {
			canActivate: jest.fn(() => true),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateCustomerUseCase,
				ListCustomerUseCase,
				{
					provide: CustomerRepository,
					useValue: {
						create: jest.fn((v) => v),
					},
				},
			],
			controllers: [CustomerV1Controller],
		})
			.overrideGuard(JwtAuthGuard)
			.useValue(mockGuard)
			.compile();

		app = module.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('/POST create customer', async () => {
		const customer: CreateCustomerDto = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			cpf: '05787697409',
			phone: faker.phone.number(),
			address: {
				zipCode: faker.address.zipCode(),
				street: faker.address.street(),
				number: faker.random.numeric(),
				complement: faker.address.secondaryAddress(),
				city: faker.address.city(),
				state: StateEnum.PE,
			},
		};

		const res = await request(app.getHttpServer())
			.post('/customer')
			.send(customer);

		expect(res.statusCode).toBe(201);
		expect(res.body.name).toBe(customer.name);
	});
});
