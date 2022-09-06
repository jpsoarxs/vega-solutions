import { CustomerModel } from '@/modules/customer/infra/models';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ProductActions } from '../../entities/enum/product-actions.enum';
import { ProductModel } from './product.model';

@Entity('products_transaction')
export class TransactionModel {
	@PrimaryColumn('uuid')
	id: string;

	@OneToOne(() => CustomerModel, ({ id }: CustomerModel) => id, {
		cascade: true,
		eager: true,
	})
	@JoinColumn({ name: 'customer' })
	customer: string;

	@OneToOne(() => ProductModel, ({ id }: ProductModel) => id, {
		cascade: true,
		eager: true,
	})
	@JoinColumn({ name: 'product' })
	product: string;

	@Column()
	quantity: number;

	@Column()
	price: number;

	@Column({ type: 'enum', enum: ProductActions })
	action: ProductActions;

	@Column({ nullable: true })
	date_to_return: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn({ nullable: true })
	deleted_at?: Date;
}
