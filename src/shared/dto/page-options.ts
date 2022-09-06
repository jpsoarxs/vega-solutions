import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum Order {
	ASC = 'ASC',
	DESC = 'DESC',
}

export class PageOptionsDto {
	@ApiPropertyOptional({ enum: Order, default: Order.ASC })
	@IsEnum(Order)
	@IsOptional()
	readonly order?: Order = Order.ASC;

	@ApiPropertyOptional({
		minimum: 1,
		default: 1,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@IsOptional()
	readonly page?: number = 1;

	@ApiPropertyOptional({
		minimum: 1,
		default: 100,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(1000)
	@IsOptional()
	readonly limit?: number = 100;

	@ApiPropertyOptional()
	@Type(() => String)
	@IsString()
	@IsOptional()
	readonly search?: string;

	get skip(): number {
		return (this.page - 1) * this.limit;
	}
}
