import { Injectable } from '@nestjs/common';
import { ProductModel, ProductRepository } from '@/modules/product/infra';

/**
 * Classe responsável em criar um novo produto
 */
@Injectable()
export class FindByIdProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	/**
	 * Função que executa a criação do produto no repositório
	 *
	 * @param product Produto a ser criado
	 * @returns Retorna o produto criado pelo repositório
	 */
	async execute(id: string): Promise<ProductModel> {
		const res = await this.repository.getById({ where: { id } });
		return res;
	}
}
