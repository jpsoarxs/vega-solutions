import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { StateEnum } from '../../entities/enum';

@Entity('customer_address')
export class AddressModel {
	@PrimaryColumn('uuid')
	id: string;

	@Column()
	street: string;

	@Column()
	number: string;

	@Column({ nullable: true })
	complement: string;

	@Column()
	zipCode: string;

	@Column()
	city: string;

	@Column()
	state: StateEnum;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
