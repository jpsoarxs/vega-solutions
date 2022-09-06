import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CustomerModel } from '../models';
import { CustomerEntity } from '../../entities';

@Injectable()
export class CustomerRepository {
	constructor(
		@InjectRepository(CustomerModel)
		private readonly userRepository: Repository<CustomerModel>,
	) {}

	async getAll(props: FindManyOptions<any>) {
		return this.userRepository.find(props);
	}

	async findOne(props: FindOneOptions): Promise<CustomerModel> {
		return this.userRepository.findOne(props);
	}

	async getById(id: FindOneOptions<CustomerModel>) {
		return this.userRepository.findOne(id);
	}

	async create(user: CustomerEntity): Promise<CustomerModel> {
		return this.userRepository.save(user);
	}

	async update(user: CustomerEntity) {
		return this.userRepository.save(user);
	}

	async delete(id: string) {
		return this.userRepository.softDelete(id);
	}

	async count(): Promise<number> {
		return this.userRepository.count();
	}
}
