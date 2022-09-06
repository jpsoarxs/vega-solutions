import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ProductActions } from '../../entities/enum/product-actions.enum';
import { ProductCategory } from '../../entities/enum/product-category.enum';

export class CreateProductDto {
	@ApiProperty({ description: 'Nome do produto' })
	@IsString()
	name: string;

	@ApiProperty({ description: 'Descrição do produto', required: false })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ description: 'Preço do produto' })
	@IsNumber()
	price: number;

	@ApiProperty({ description: 'Categoria do produto', enum: ProductCategory })
	@IsEnum(ProductCategory)
	category: ProductCategory;

	@ApiProperty({ description: 'Ação do produto', enum: ProductActions })
	@IsEnum(ProductActions)
	action: ProductActions;
}
