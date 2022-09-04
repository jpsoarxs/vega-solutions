import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from '../controllers/dtos/signin-user.dto';
import { AuthenticateByPasswordUseCase } from './authenticate-by-password.use-case';

/**
 * Classe que gera token JWT para autenticação
 */
@Injectable()
export class LoginUseCase {
	constructor(
		private jwtService: JwtService,
		private autenticateUseCase: AuthenticateByPasswordUseCase,
	) {}

	/**
	 * Função que gera token JWT sem integração com identity
	 *
	 * @param signinUserDto credenciais de autenticação
	 * @returns Token JWT válido
	 */
	async execute(signinUserDto: SigninUserDto) {
		const user = await this.autenticateUseCase.execute(signinUserDto);

		if (!user) {
			throw new NotFoundException();
		}

		const payload = { email: user.email, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
