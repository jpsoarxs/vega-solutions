import * as request from 'supertest';
import { INestApplication, CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
	CreateProductUseCase,
	CreateTransactionUseCase,
	ListProductUseCase,
	ListTransactionUseCase,
} from '../../use-cases';
import { ProductRepository, TransactionRepository } from '../../infra';
import { ProductControllerV1 } from '../product-v1.controller';
import { CreateProductDto, CreateTransactionDto } from '../dto';
import { faker } from '@faker-js/faker';
import { ProductActions } from '../../entities/enum/product-actions.enum';
import { ProductCategory } from '../../entities/enum/product-category.enum';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { FindByIdCustomerUseCase } from '@/modules/customer/use-cases';
import { CustomerModel, CustomerRepository } from '@/modules/customer/infra';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { StateEnum } from '@/modules/customer/entities/enum';

describe('ProductControllerV1', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const mockGuard: CanActivate = {
			canActivate: jest.fn(() => true),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateProductUseCase,
				CreateTransactionUseCase,
				ListProductUseCase,
				ListTransactionUseCase,
				FindByIdCustomerUseCase,
				{
					provide: ProductRepository,
					useValue: {
						create: jest.fn((v) => v),
					},
				},
				{
					provide: TransactionRepository,
					useValue: {
						create: jest.fn((v) => v),
					},
				},
				{
					provide: CustomerRepository,
					useValue: {
						getById: jest.fn(
							(props?: FindOneOptions): CustomerModel =>
								({
									id: (props.where as FindOptionsWhere<any>).id,
									name: faker.name.firstName(),
									email: faker.internet.email(),
									phone: faker.phone.number(),
									cpf: '023234234533',
									address: {
										id: faker.datatype.uuid(),
										zipCode: faker.address.zipCode(),
										street: faker.address.street(),
										number: faker.address.streetAddress(),
										city: faker.address.city(),
										complement: null,
										state: StateEnum.PE,
										created_at: new Date(),
										updated_at: new Date(),
									},
									created_at: new Date(),
									updated_at: new Date(),
								} as CustomerModel),
						),
					},
				},
			],
			controllers: [ProductControllerV1],
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

	it('/POST create product', async () => {
		const product: CreateProductDto = {
			name: faker.name.firstName(),
			description: faker.lorem.paragraph(),
			price: Number(faker.random.numeric()),
			action: ProductActions.BUY,
			category: ProductCategory.TV_SHOW,
		};

		const res = await request(app.getHttpServer())
			.post('/product')
			.send(product);

		expect(res.statusCode).toBe(201);
		expect(res.body.name).toBe(product.name);
	});

	it('/POST create transaction', async () => {
		const transaction: CreateTransactionDto = {
			customer: faker.datatype.uuid(),
			product: faker.datatype.uuid(),
			quantity: faker.datatype.number(),
		};

		const res = await request(app.getHttpServer())
			.post('/product/checkout')
			.send(transaction);

		expect(res.statusCode).toBe(201);
	});
});
