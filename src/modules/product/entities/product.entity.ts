import { Injectable } from '@nestjs/common';
import { EntityClass, EntityValidator, IEntity } from '@/shared';
import {
	IsOptional,
	IsString,
	IsNumber,
	IsEnum,
	IsUUID,
} from 'class-validator';
import { ProductCategory } from './enum/product-category.enum';
import { ProductActions } from './enum/product-actions.enum';

/**
 * Tipo do produto
 */
export type Product = {
	id?: string;
	name: string;
	description?: string;
	price: number;
	category: ProductCategory;
	action: ProductActions;
};

/**
 * Classe de produto padrão
 */
@Injectable()
export class ProductEntity extends EntityClass implements IEntity {
	/**
	 * ID do produto
	 */
	@IsString()
	@IsUUID()
	@IsOptional()
	id: string;

	/**
	 * Nome do produto
	 */
	@IsString()
	name: string;

	/**
	 *  Descrição do produto
	 */
	@IsString()
	@IsOptional()
	description?: string;

	/**
	 * Valor do produto
	 */
	@IsNumber()
	price: number;

	/**
	 * Categoria do produto
	 */
	@IsEnum(ProductCategory)
	category: ProductCategory;

	/**
	 * Ação do produto
	 */
	@IsEnum(ProductActions)
	action: ProductActions;

	constructor(product: Product) {
		super({ id: product.id });
		this.name = product.name;
		this.description = product.description;
		this.price = Math.round(product.price * 100) / 100;
		this.category = product.category;
		this.action = product.action;
		this.validate();
	}

	/**
	 * Valida os campos - Função executada automaticamente pelo construtor
	 */
	validate(): void {
		const validator = new EntityValidator(this);
		validator.validate('product');
	}

	/**
	 * Verifica se a entidade é a mesma que a comparada
	 *
	 * @param entity entidade a ser comparada
	 * @returns verdadeiro ou falso
	 */
	equals(entity: IEntity): boolean {
		if (!(entity instanceof ProductEntity)) return false;

		return this.id === entity.id;
	}
}
