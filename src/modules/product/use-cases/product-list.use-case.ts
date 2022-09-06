import { Injectable } from '@nestjs/common';
import { ProductModel, ProductRepository } from '@/modules/product/infra';
import { PageOptionsDto } from '@/shared';

interface ProductList {
	data: ProductModel[];
	total: number;
}

/**
 * Classe responsável em buscar um produto
 */
@Injectable()
export class ListProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	/**
	 * Função que executa a busca do produto no repositório
	 *
	 * @param params paginacao e filtros
	 * @returns Retorna o produto correspondente pelo repositório
	 */
	async execute(params: PageOptionsDto): Promise<ProductList> {
		const count = await this.repository.count();

		const res = await this.repository.getAll({
			take: params.limit,
			skip: params.skip,
			order: { created_at: params.order },
		});

		return { data: res, total: count };
	}
}
