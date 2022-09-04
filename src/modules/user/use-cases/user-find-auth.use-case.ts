import { UserRepository } from '@/modules/user/infra/repositories';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../infra/models';

/**
 * Classe que busca usuários pelo email e retorna com os dados utilizados na autenticação
 */
@Injectable()
export class UserFindAuthUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	/**
	 * Função que executa a busca por email
	 *
	 * @param email email do usuário
	 * @returns Usuário encontrado para autenticação
	 */
	async execute(email: string): Promise<UserModel> {
		return this.userRepository.findOne({
			where: { email },
			select: ['id', 'email', 'password'],
		});
	}
}
