import { Column, Entity, PrimaryColumn } from 'typeorm';
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

	@Column()
	created_at: Date;

	@Column()
	updated_at: Date;
}
