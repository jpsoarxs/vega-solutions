import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninUserDto {
	@ApiProperty({ description: 'email de usuário' })
	@IsString()
	@IsEmail()
	username: string;

	@ApiProperty({ description: 'senha de usuário' })
	@IsString()
	password: string;
}
