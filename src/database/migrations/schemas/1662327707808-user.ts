import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class user1662327707808 implements MigrationInterface {
	private tableName = 'users';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: this.tableName,
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
					},
					{
						name: 'deleted_at',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.tableName);
	}
}
