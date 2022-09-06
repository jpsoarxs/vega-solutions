import { Injectable } from '@nestjs/common';
import { CustomerModel, CustomerRepository } from '@/modules/customer/infra';

/**
 * Classe responsável em criar um novo produto
 */
@Injectable()
export class FindByIdCustomerUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	/**
	 * Função que executa a criação do produto no repositório
	 *
	 * @param product Produto a ser criado
	 * @returns Retorna o produto criado pelo repositório
	 */
	async execute(id: string): Promise<CustomerModel> {
		const res = await this.repository.getById({ where: { id } });
		return res;
	}
}
