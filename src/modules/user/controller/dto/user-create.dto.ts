import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ description: 'Nome do usuario' })
	@IsString()
	name: string;

	@ApiProperty({ description: 'Email do usuario' })
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'Senha do usuario' })
	@IsString()
	password: string;
}
