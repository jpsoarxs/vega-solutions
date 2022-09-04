import { Injectable } from '@nestjs/common';
import {
	EntityClass,
	EntityValidationError,
	EntityValidator,
	IEntity,
} from '@/shared';
import { IsEmail, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import configuration from '@/config/configuration';

/**
 * Tipo de usuario
 */
export type User = {
	name: string;
	email: string;
	password: string;
};

/**
 * Classe de usuario padrão
 */
@Injectable()
export class UserEntity extends EntityClass implements IEntity {
	/**
	 * Nome do usuario
	 */
	@IsString()
	name: string;

	/**
	 * Email do usuario
	 */
	@IsString()
	@IsEmail()
	email: string;

	/**
	 * Senha do usuario
	 */
	@IsString()
	password: string;

	constructor(user: User) {
		super();
		this.name = user.name;
		this.email = user.email;
		this.password = user.password;
	}

	/**
	 * Valida os campos - Função executada automaticamente pelo construtor
	 */
	validate(): void {
		const validator = new EntityValidator(this);
		validator.validate('user');
	}

	/**
	 * Verifica se a entidade é a mesma que a comparada
	 *
	 * @param entity entidade a ser comparada
	 * @returns verdadeiro ou falso
	 */
	equals(entity: IEntity): boolean {
		if (!(entity instanceof UserEntity)) return false;

		return this.id === entity.id;
	}

	/**
	 * Função que encripta a senha do usuário ao salvar no banco
	 */
	async hashPassword(): Promise<void> {
		const saltRounds = configuration().auth.saltRounds;
		const salt = await bcrypt.genSalt(saltRounds);

		this.password = await bcrypt.hash(this.password, salt);
	}

	/**
	 * Função que compara a senha salva com a senha fornecida
	 *
	 * Dispara um erro caso as senhas não sejam iguais
	 *
	 * @param pass senha que será comparada ao hash salvo na entidade
	 */
	async comparePassword(pass: string): Promise<void> {
		const isEqual = await bcrypt.compare(pass, this.password);

		if (!isEqual) {
			throw new EntityValidationError(
				'Customer',
				{ password: { error: ['invalid password'] } },
				400,
			);
		}
	}
}
