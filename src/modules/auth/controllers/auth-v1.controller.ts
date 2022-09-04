import { Controller, Post, VERSION_NEUTRAL, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from '../use-cases/login-use-case';
import { SigninUserDto } from './dtos/signin-user.dto';

@ApiTags('auth')
@Controller({
	path: 'auth',
	version: [VERSION_NEUTRAL],
})
export class AuthControllerV1 {
	constructor(private readonly loginUseCase: LoginUseCase) {}

	@Post('/login')
	async login(@Body() signinUserDto: SigninUserDto) {
		return this.loginUseCase.execute(signinUserDto);
	}
}
