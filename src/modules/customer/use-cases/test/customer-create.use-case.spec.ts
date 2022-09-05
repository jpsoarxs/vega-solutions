import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from '../../infra/repositories';
import { CreateCustomerUseCase } from '../';
import { StateEnum } from '../../entities/enum';

describe('CreateCustomerUseCase', () => {
	let createCustomer: CreateCustomerUseCase;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateCustomerUseCase,
				{
					provide: CustomerRepository,
					useValue: {
						create: jest.fn((v) => v),
					},
				},
			],
		}).compile();

		createCustomer = module.get<CreateCustomerUseCase>(CreateCustomerUseCase);
	});

	it('should create new customer', async () => {
		const customer = {
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
				state: StateEnum.SP,
			},
		};

		const result = await createCustomer.execute(customer);

		expect(result.id).toEqual(expect.any(String));
		expect(result.email).toBe(customer.email);
		expect(result.name).toBe(customer.name);
	});
});
