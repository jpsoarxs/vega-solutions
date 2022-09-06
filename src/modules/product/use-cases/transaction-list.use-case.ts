import { Injectable } from '@nestjs/common';
import {
	TransactionModel,
	TransactionRepository,
} from '@/modules/product/infra';
import { PageOptionsDto } from '@/shared';
import { Raw } from 'typeorm';

interface TransactionList {
	data: TransactionModel[];
	total: number;
}

/**
 * Classe responsável em buscar as transações
 */
@Injectable()
export class ListTransactionUseCase {
	constructor(private readonly repository: TransactionRepository) {}

	/**
	 * Função que executa a busca da transação no repositório
	 *
	 * @param params paginacao e filtros
	 * @returns Retorna as transações correspondente pelo repositório
	 */
	async execute(params: PageOptionsDto): Promise<TransactionList> {
		const count = await this.repository.count();

		const res = await this.repository.getAll({
			take: params.limit,
			skip: params.skip,
			order: { created_at: params.order },
			where: [
				{
					action: Raw((alias) => `${alias} ILIKE '%${params.search || ''}%'`),
				},
			],
		});

		return { data: res, total: count };
	}
}
