import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
	TransactionModel,
	TransactionRepository,
	ProductRepository,
} from '@/modules/product/infra';
import { TransactionEntity } from '@/modules/product/entities';
import { CreateTransactionDto } from '@/modules/product/controller/dto';
import { FindByIdCustomerUseCase } from '@/modules/customer/use-cases';
import { ProductActions } from '../entities/enum/product-actions.enum';

/**
 * Classe responsável em criar uma nova transação de produto
 */
@Injectable()
export class CreateTransactionUseCase {
	constructor(
		private readonly repository: TransactionRepository,
		private readonly product: ProductRepository,
		private readonly customer: FindByIdCustomerUseCase,
	) {}

	/**
	 * Função que executa a criação da transacão no repositório
	 *
	 * @param transaction Transação a ser criada
	 * @returns Retorna a transação criada pelo repositório
	 */
	async execute(transaction: CreateTransactionDto): Promise<TransactionModel> {
		const customer = await this.customer.execute(transaction.customer);

		if (!customer) {
			throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
		}

		const product = await this.product.getById({
			where: { id: transaction.product },
		});

		if (!product) {
			throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
		}

		transaction.action = transaction.action || product.action;

		if (
			transaction.action === ProductActions.RENT &&
			!transaction.date_to_return
		) {
			throw new HttpException(
				'You must inform the date to return',
				HttpStatus.BAD_REQUEST,
			);
		}

		const entity = new TransactionEntity({
			...transaction,
			price: product.price * transaction.quantity,
		});

		const res = await this.repository.create(entity);
		return res;
	}
}
