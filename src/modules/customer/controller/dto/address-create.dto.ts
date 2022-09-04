import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { StateEnum } from '../../entities/enum';

export class CreateAddressDto {
	@ApiProperty({ description: 'Código postal - CEP' })
	@IsString()
	zipCode: string;

	@ApiProperty({ description: 'Rua' })
	@IsString()
	street: string;

	@ApiProperty({ description: 'Número' })
	@IsString()
	number: string;

	@ApiProperty({ description: 'Complemento', required: false })
	@IsOptional()
	@IsString()
	complement?: string;

	@ApiProperty({ description: 'Cidade' })
	@IsString()
	city: string;

	@ApiProperty({ description: 'Estado', enum: StateEnum })
	@IsString()
	state: StateEnum;
}
