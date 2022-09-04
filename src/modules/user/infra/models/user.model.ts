import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserModel {
	@PrimaryColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	password: string;

	@Column()
	created_at: Date;

	@Column()
	updated_at: Date;

	@Column({ nullable: true })
	deleted_at?: Date;
}
