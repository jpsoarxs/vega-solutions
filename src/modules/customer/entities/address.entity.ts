import { Injectable } from '@nestjs/common';
import { EntityClass, EntityValidator, IEntity } from '@/shared';
import { IsOptional, IsString } from 'class-validator';
import { StateEnum } from './enum';

/**
 * Tipo de endereço
 */
export type Address = {
	zipCode: string;
	street: string;
	number: string;
	complement?: string;
	city: string;
	state: StateEnum;
};

/**
 * Classe de endereço padrão
 */
@Injectable()
export class AddressEntity extends EntityClass implements IEntity {
	/**
	 * CEP
	 */
	@IsString()
	zipCode: string;

	/**
	 * Rua
	 */
	@IsString()
	street: string;

	/**
	 * numero do endereço
	 */
	@IsString()
	number: string;

	/**
	 * Complemento do endereço
	 */
	@IsString()
	@IsOptional()
	complement?: string;

	/**
	 * Cidade
	 */
	@IsString()
	city: string;

	/**
	 * Estado
	 */
	@IsString()
	state: StateEnum;

	constructor(address: Address) {
		super();
		this.zipCode = address.zipCode;
		this.street = address.street;
		this.number = address.number;
		this.complement = address.complement;
		this.city = address.city;
		this.state = address.state;
	}

	/**
	 * Valida os campos - Função executada automaticamente pelo construtor
	 */
	validate(): void {
		const validator = new EntityValidator(this);
		validator.validate('address');
	}

	/**
	 * Verifica se a entidade é a mesma que a comparada
	 *
	 * @param entity entidade a ser comparada
	 * @returns verdadeiro ou falso
	 */
	equals(entity: IEntity): boolean {
		if (!(entity instanceof AddressEntity)) return false;

		return this.id === entity.id;
	}
}
