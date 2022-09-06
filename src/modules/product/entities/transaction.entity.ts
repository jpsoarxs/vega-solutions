import { Injectable } from '@nestjs/common';
import { EntityClass, EntityValidator, IEntity } from '@/shared';
import {
	IsOptional,
	IsString,
	IsNumber,
	IsEnum,
	IsUUID,
	IsDateString,
} from 'class-validator';
import { ProductActions } from './enum/product-actions.enum';

/**
 * Tipo da transação
 */
export type Transaction = {
	id?: string;
	customer: string;
	product: string;
	action?: ProductActions;
	quantity: number;
	price?: number;
	date_to_return?: Date;
};

/**
 * Classe de transação padrão
 */
@Injectable()
export class TransactionEntity extends EntityClass implements IEntity {
	/**
	 * ID da transação
	 */
	@IsString()
	@IsUUID()
	@IsOptional()
	id: string;

	/**
	 * Cliente da transação
	 */
	@IsString()
	@IsUUID()
	customer: string;

	/**
	 * Produto da transação
	 */
	@IsString()
	@IsUUID()
	product: string;

	/**
	 * Valor da transação
	 */
	@IsNumber()
	price: number;

	/**
	 * Ação da transação
	 */
	@IsEnum(ProductActions)
	action: ProductActions;

	/**
	 * Quantidade da transação
	 */
	@IsNumber()
	quantity: number;

	/**
	 * Data de devolução do produto
	 */
	@IsOptional()
	@IsDateString()
	date_to_return?: Date;

	constructor(transaction: Transaction) {
		super({ id: transaction.id });
		this.customer = transaction.customer;
		this.product = transaction.product;
		this.action = transaction.action;
		this.quantity = transaction.quantity;
		this.price = transaction.price * transaction.quantity;
		this.date_to_return = transaction.date_to_return;
		this.validate();
	}

	/**
	 * Valida os campos - Função executada automaticamente pelo construtor
	 */
	validate(): void {
		const validator = new EntityValidator(this);
		validator.validate('transaction');
	}

	/**
	 * Verifica se a entidade é a mesma que a comparada
	 *
	 * @param entity entidade a ser comparada
	 * @returns verdadeiro ou falso
	 */
	equals(entity: IEntity): boolean {
		if (!(entity instanceof TransactionEntity)) return false;

		return this.id === entity.id;
	}
}
