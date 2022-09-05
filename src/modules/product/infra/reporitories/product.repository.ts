import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ProductModel } from '../';
import { ProductEntity } from '../../entities';

@Injectable()
export class ProductRepository {
	constructor(
		@InjectRepository(ProductModel)
		private readonly prodRepository: Repository<ProductModel>,
	) {}

	async getAll(props: FindManyOptions<any>) {
		return this.prodRepository.find(props);
	}

	async findOne(props: FindOneOptions): Promise<ProductModel> {
		return this.prodRepository.findOne(props);
	}

	async getById(id: FindOneOptions<ProductModel>) {
		return this.prodRepository.findOne(id);
	}

	async create(user: ProductEntity): Promise<ProductModel> {
		return this.prodRepository.save(user);
	}

	async update(user: ProductEntity) {
		return this.prodRepository.save(user);
	}

	async delete(id: string) {
		return this.prodRepository.softDelete(id);
	}
}
