import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class customerRelations1662320866208 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'customers',
			new TableForeignKey({
				columnNames: ['address'],
				referencedColumnNames: ['id'],
				referencedTableName: 'customer_address',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('customers', 'address');
	}
}
