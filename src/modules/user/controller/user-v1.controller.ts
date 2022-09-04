import {
	Body,
	Controller,
	HttpException,
	Post,
	UseGuards,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserModel } from '../infra/models';

import { CreateUserDto } from '@/modules/user/controller/dto';
import { CreateUserUseCase } from '@/modules/user/use-cases';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';

@ApiTags('user')
@ApiBearerAuth('access_token')
@Controller({
	path: 'user',
	version: [VERSION_NEUTRAL],
})
export class UserV1Controller {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
		try {
			const user = await this.createUserUseCase.execute(createUserDto);
			return user;
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}
}
