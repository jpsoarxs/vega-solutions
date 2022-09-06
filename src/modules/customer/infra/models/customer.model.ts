import {
	Column,
	Entity,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';
import { AddressModel } from './';

@Entity('customers')
export class CustomerModel {
	@PrimaryColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@OneToOne(() => AddressModel, ({ id }: AddressModel) => id, {
		cascade: true,
		eager: true,
	})
	@JoinColumn({ name: 'address' })
	address: AddressModel;

	@Column({ nullable: true })
	phone: string;

	@Column()
	cpf: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn({ nullable: true })
	deleted_at?: Date;
}
