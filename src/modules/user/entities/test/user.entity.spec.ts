import { UserEntity } from '..';
import { faker } from '@faker-js/faker';

jest.mock('moment', () => () => ({
	toDate: () => new Date(),
}));

describe('UserEntity', () => {
	test('should create new user entity', () => {
		const user = new UserEntity({
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		});

		expect(user.id).toEqual(expect.any(String));
	});
});
