import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UserModel } from '../models';
import { UserEntity } from '../../entities';

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(UserModel)
		private readonly userRepository: Repository<UserModel>,
	) {}

	async getAll(props: FindManyOptions<any>) {
		return this.userRepository.find(props);
	}

	async findOne(props: FindOneOptions): Promise<UserModel> {
		return this.userRepository.findOne(props);
	}

	async getById(id: FindOneOptions<UserModel>) {
		return this.userRepository.findOne(id);
	}

	async create(user: UserEntity): Promise<UserModel> {
		return this.userRepository.save(user);
	}

	async update(user: UserEntity) {
		return this.userRepository.save(user);
	}

	async delete(id: string) {
		return this.userRepository.softDelete(id);
	}
}
