import { Injectable } from '@nestjs/common';
import { ProductModel, ProductRepository } from '@/modules/product/infra';
import { ProductEntity } from '@/modules/product/entities';
import { CreateProductDto } from '@/modules/product/controller/dto';

/**
 * Classe responsável em criar um novo produto
 */
@Injectable()
export class CreateProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	/**
	 * Função que executa a criação do produto no repositório
	 *
	 * @param product Produto a ser criado
	 * @returns Retorna o produto criado pelo repositório
	 */
	async execute(product: CreateProductDto): Promise<ProductModel> {
		const entity = new ProductEntity(product);

		const res = await this.repository.create(entity);
		return res;
	}
}
