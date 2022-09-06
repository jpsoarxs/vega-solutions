import { Injectable } from '@nestjs/common';
import { CustomerModel, CustomerRepository } from '@/modules/customer/infra';

/**
 * Classe responsável em buscar um cliente
 */
@Injectable()
export class FindByIdCustomerUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	/**
	 * Função que executa a busca do cliente no repositório
	 *
	 * @param id id a ser procurado
	 * @returns Retorna o cliente pelo repositório
	 */
	async execute(id: string): Promise<CustomerModel> {
		const res = await this.repository.getById({ where: { id } });
		return res;
	}
}
