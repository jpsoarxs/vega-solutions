import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class productsTransaction1662419074559 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'products_transaction',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'customer',
						type: 'uuid',
					},
					{
						name: 'product',
						type: 'uuid',
					},
					{
						name: 'action',
						type: 'varchar',
					},
					{
						name: 'quantity',
						type: 'int',
					},
					{
						name: 'price',
						type: 'decimal',
					},
					{
						name: 'date_to_return',
						type: 'timestamp',
						isNullable: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'deleted_at',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'products_transaction',
			new TableForeignKey({
				columnNames: ['customer'],
				referencedColumnNames: ['id'],
				referencedTableName: 'customers',
				onDelete: 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'products_transaction',
			new TableForeignKey({
				columnNames: ['product'],
				referencedColumnNames: ['id'],
				referencedTableName: 'products',
				onDelete: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('products_transaction');
	}
}
