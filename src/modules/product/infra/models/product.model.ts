import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProductActions } from '../../entities/enum/product-actions.enum';
import { ProductCategory } from '../../entities/enum/product-category.enum';

@Entity('products')
export class ProductModel {
	@PrimaryColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column({ type: 'enum', enum: ProductCategory })
	category: ProductCategory;

	@Column({ type: 'enum', enum: ProductActions })
	action: ProductActions;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn({ nullable: true })
	deleted_at?: Date;
}
