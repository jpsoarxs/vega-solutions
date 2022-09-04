import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infra/repositories';
import { UserModel } from '@/modules/user/infra/models';
import { UserEntity } from '@/modules/user/entities';
import { CreateUserDto } from '@/modules/user/controller/dto';

/**
 * Classe responsável em criar um novo usuário
 * e remover o campo de senha caso seja enviado pelo repositório
 */
@Injectable()
export class CreateUserUseCase {
	constructor(private readonly repository: UserRepository) {}

	/**
	 * Função que executa a criação do usuário no repositório
	 *
	 * @param customer Cliente a ser criado
	 * @returns Retorna o cliente criado pelo repositório
	 */
	async execute(customer: CreateUserDto): Promise<UserModel> {
		const entity = new UserEntity(customer);

		await entity.hashPassword();

		const res = await this.repository.create(entity);

		if (res.password) delete res.password;

		return res;
	}
}
