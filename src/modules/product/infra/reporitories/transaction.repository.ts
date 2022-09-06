import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { TransactionModel } from '../';
import { TransactionEntity } from '../../entities';

@Injectable()
export class TransactionRepository {
	constructor(
		@InjectRepository(TransactionModel)
		private readonly prodRepository: Repository<TransactionModel>,
	) {}

	async getAll(props: FindManyOptions<any>) {
		return this.prodRepository.find(props);
	}

	async findOne(props: FindOneOptions): Promise<TransactionModel> {
		return this.prodRepository.findOne(props);
	}

	async getById(id: FindOneOptions<TransactionModel>) {
		return this.prodRepository.findOne(id);
	}

	async create(user: TransactionEntity): Promise<TransactionModel> {
		return this.prodRepository.save(user);
	}

	async update(user: TransactionEntity) {
		return this.prodRepository.save(user);
	}

	async delete(id: string) {
		return this.prodRepository.softDelete(id);
	}

	async count(): Promise<number> {
		return this.prodRepository.count();
	}
}
