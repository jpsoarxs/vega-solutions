import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../infra/repositories';
import { CreateUserUseCase } from '..';

describe('CreateUserUseCase', () => {
	let createUser: CreateUserUseCase;

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
		}).compile();

		createUser = module.get<CreateUserUseCase>(CreateUserUseCase);
	});

	it('should create new user with hashed password', async () => {
		const customer = {
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const result = await createUser.execute(customer);

		expect(result.id).toEqual(expect.any(String));
		expect(result.email).toBe(customer.email);
		expect(result.name).toBe(customer.name);
		expect(result.password).toBe(undefined);
	});
});
