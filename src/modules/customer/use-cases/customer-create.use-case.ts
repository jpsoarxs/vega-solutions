import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '@/modules/customer/infra/repositories';
import { CustomerModel } from '@/modules/customer/infra/models';
import { CustomerEntity } from '@/modules/customer/entities';
import { CreateCustomerDto } from '@/modules/customer/controller/dto';

/**
 * Classe responsável em criar um novo cliente
 * e remover o campo de senha caso seja enviado pelo repositório
 */
@Injectable()
export class CreateCustomerUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	/**
	 * Função que executa a criação do usuário no repositório
	 *
	 * @param customer Cliente a ser criado
	 * @returns Retorna o cliente criado pelo repositório
	 */
	async execute(customer: CreateCustomerDto): Promise<CustomerModel> {
		const entity = new CustomerEntity(customer);
		const res = await this.repository.create(entity);

		return res;
	}
}
