import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsObject } from 'class-validator';
import { CreateAddressDto } from './';

export class CreateCustomerDto {
	@ApiProperty({ description: 'Nome do cliente' })
	@IsString()
	name: string;

	@ApiProperty({ description: 'Email de cliente' })
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty({ description: 'CPF do cliente' })
	@IsString()
	cpf: string;

	@ApiProperty({ description: 'Telefone do cliente', required: false })
	@IsOptional()
	@IsString()
	phone?: string;

	@ApiProperty({
		description: 'Endereço do cliente',
		required: true,
		type: () => CreateAddressDto,
	})
	@IsObject()
	address: CreateAddressDto;
}
