import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class customerRemovePassword1662413015593 implements MigrationInterface {
	private tableName = 'customer';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn(this.tableName, 'password');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			this.tableName,
			new TableColumn({
				name: 'password',
				type: 'varchar',
			}),
		);
	}
}
