import { MigrationInterface } from 'typeorm';
import dataSource from '@/database/postgres-data-source';
import { UserModel } from '@/modules/user/infra/models';
import { UserEntity } from '@/modules/user/entities';

export class rootUser1662353224552 implements MigrationInterface {
	public async up(): Promise<void> {
		const userRepository = dataSource.manager.getRepository(UserModel);

		const user = new UserEntity({
			name: 'root',
			email: 'root@root.com',
			password: 'root',
		});

		await user.hashPassword();

		await userRepository.save(user);
	}

	public async down(): Promise<void> {
		/* No way back */
	}
}
