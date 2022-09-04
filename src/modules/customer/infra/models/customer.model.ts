import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { AddressModel } from './';

@Entity('customers')
export class CustomerModel {
	@PrimaryColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	password: string;

	@OneToOne(() => AddressModel, ({ id }: AddressModel) => id, { cascade: true })
	@JoinColumn({ name: 'address' })
	address: AddressModel;

	@Column({ nullable: true })
	phone: string;

	@Column()
	cpf: string;

	@Column()
	created_at: Date;

	@Column()
	updated_at: Date;

	@Column({ nullable: true })
	deleted_at?: Date;
}
