import { Injectable } from '@nestjs/common';
import { CustomerModel, CustomerRepository } from '@/modules/customer/infra';
import { PageOptionsDto } from '@/shared';

interface CustomerList {
	data: CustomerModel[];
	total: number;
}

/**
 * Classe responsável em buscar um cliente
 */
@Injectable()
export class ListCustomerUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	/**
	 * Função que executa a busca do cliente no repositório
	 *
	 * @param params paginacao e filtros
	 * @returns Retorna o cliente pelo repositório
	 */
	async execute(params: PageOptionsDto): Promise<CustomerList> {
		const count = await this.repository.count();

		const res = await this.repository.getAll({
			take: params.limit,
			skip: params.skip,
			order: { created_at: params.order },
		});

		return { data: res, total: count };
	}
}
