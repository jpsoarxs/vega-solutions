import { Injectable } from '@nestjs/common';
import { ProductModel, ProductRepository } from '@/modules/product/infra';

/**
 * Classe responsável em buscar um produto
 */
@Injectable()
export class FindByIdProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	/**
	 * Função que executa a busca do produto no repositório
	 *
	 * @param id id a ser procurado
	 * @returns Retorna o produto correspondente pelo repositório
	 */
	async execute(id: string): Promise<ProductModel> {
		const res = await this.repository.getById({ where: { id } });
		return res;
	}
}
