import { CustomerEntity } from '../';
import { faker } from '@faker-js/faker';
import { StateEnum } from '../enum';

jest.mock('moment', () => () => ({
	toDate: () => new Date(),
}));

describe('CustomerEntity', () => {
	test('should create new customer entity', () => {
		const customer = new CustomerEntity({
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
		});

		expect(customer.id).toEqual(expect.any(String));
	});

	test('should NOT create new customer with out address', () => {
		const customerFactory = () =>
			new CustomerEntity({
				name: faker.name.firstName(),
				email: faker.internet.email(),
				cpf: '05787697409',
				phone: faker.phone.number(),
			});

		expect(customerFactory).toThrow();
	});

	test('should create new user entity with minimum data', () => {
		const customer = new CustomerEntity({
			name: faker.name.firstName(),
			email: faker.internet.email(),
			cpf: '05787697409',
			address: {
				zipCode: faker.address.zipCode(),
				street: faker.address.street(),
				number: faker.random.numeric(),
				city: faker.address.city(),
				state: StateEnum.PE,
			},
		});

		expect(customer.id).toEqual(expect.any(String));
	});
});
