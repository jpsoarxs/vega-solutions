import { Injectable } from '@nestjs/common';
import { EntityClass, EntityValidator, IEntity } from '@/shared';
import { IsEmail, IsOptional, IsString, IsObject } from 'class-validator';
import { Address, AddressEntity } from './';

/**
 * Tipo de cliente
 */
export type Customer = {
	name: string;
	email: string;
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
}
