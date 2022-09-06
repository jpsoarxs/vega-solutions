import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsNumber,
	IsEnum,
	IsUUID,
	IsDateString,
	IsOptional,
} from 'class-validator';
import { ProductActions } from '../../entities/enum/product-actions.enum';

export class CreateTransactionDto {
	@ApiProperty({ description: 'ID do cliente' })
	@IsString()
	@IsUUID()
	customer: string;

	@ApiProperty({ description: 'ID do produto' })
	@IsString()
	@IsUUID()
	product: string;

	@ApiProperty({ description: 'Ação da transação', enum: ProductActions })
	@IsEnum(ProductActions)
	@IsOptional()
	action?: ProductActions;

	@ApiProperty({ description: 'Quantidade' })
	@IsNumber()
	quantity: number;

	@ApiProperty({ description: 'Data de devolução' })
	@IsDateString()
	@IsOptional()
	date_to_return?: Date;
}
