import { Injectable } from '@nestjs/common';
import {
	EntityClass,
	EntityValidationError,
	EntityValidator,
	IEntity,
} from '@/shared';
import { IsEmail, IsOptional, IsString, IsObject } from 'class-validator';
import * as bcrypt from 'bcrypt';
import configuration from '@/config/configuration';
import { Address, AddressEntity } from './';

/**
 * Tipo de cliente
 */
export type Customer = {
	name: string;
	email: string;
	password: string;
	address?: Address;
	phone?: string;
	cpf: string;
};

/**
 * Classe de cliente padrão
 */
@Injectable()
export class CustomerEntity extends EntityClass implements IEntity {
	/**
	 * Nome do cliente
	 */
	@IsString()
	name: string;

	/**
	 * Email do cliente
	 */
	@IsString()
	@IsEmail()
	email: string;

	/**
	 * Senha do cliente
	 */
	@IsString()
	password: string;

	/**
	 * Endereço do cliente
	 */
	@IsObject()
	address: Address;

	/**
	 * Telefone do cliente
	 */
	@IsString()
	@IsOptional()
	phone?: string;

	/**
	 * CPF do cliente
	 */
	@IsString()
	cpf: string;

	constructor(customer: Customer) {
		super();
		this.name = customer.name;
		this.email = customer.email;
		this.password = customer.password;
		this.phone = customer.phone;
		this.address = new AddressEntity(customer.address);
		this.cpf = customer.cpf;
	}

	/**
	 * Valida os campos - Função executada automaticamente pelo construtor
	 */
	validate(): void {
		const validator = new EntityValidator(this);
		validator.validate('customer');
	}

	/**
	 * Verifica se a entidade é a mesma que a comparada
	 *
	 * @param entity entidade a ser comparada
	 * @returns verdadeiro ou falso
	 */
	equals(entity: IEntity): boolean {
		if (!(entity instanceof CustomerEntity)) return false;

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
