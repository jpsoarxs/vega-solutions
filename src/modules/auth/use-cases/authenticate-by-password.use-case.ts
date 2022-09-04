import { Injectable, Logger } from '@nestjs/common';
import { UserFindAuthUseCase } from '../../user/use-cases';

import * as bcrypt from 'bcrypt';
import { SigninUserDto } from '../controllers/dtos/signin-user.dto';

/**
 * Classe que validar credenciais de acesso fornecidas
 */
@Injectable()
export class AuthenticateByPasswordUseCase {
	constructor(private findAuthUserUseCase: UserFindAuthUseCase) {}

	/**
	 * Função que válida credenciais de acesso do usuário
	 *
	 * @param signinUserDto credenciais de autenticação
	 * @returns Usuário ou null
	 */
	async execute(signinUserDto: SigninUserDto): Promise<any> {
		try {
			const user = await this.findAuthUserUseCase.execute(
				signinUserDto.username,
			);

			const isSamePassword = await bcrypt.compare(
				signinUserDto.password,
				user.password,
			);

			if (user && isSamePassword) {
				return user;
			}
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}
}
