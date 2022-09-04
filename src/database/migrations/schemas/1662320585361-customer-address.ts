import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class customerAddress1662320585361 implements MigrationInterface {
	private tableName = 'customer_address';

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
						name: 'street',
						type: 'varchar',
					},
					{
						name: 'number',
						type: 'varchar',
					},
					{
						name: 'complement',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'zipCode',
						type: 'varchar',
					},
					{
						name: 'city',
						type: 'varchar',
					},
					{
						name: 'state',
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
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(this.tableName);
	}
}
