import { PageDto, PageMetaDto, PageOptionsDto } from '@/shared';
import {
	Controller,
	Post,
	VERSION_NEUTRAL,
	Body,
	HttpException,
	Get,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductModel, TransactionModel } from '../infra';
import {
	CreateProductUseCase,
	CreateTransactionUseCase,
	ListProductUseCase,
	ListTransactionUseCase,
} from '../use-cases';
import { CreateProductDto, CreateTransactionDto } from './dto';

@ApiTags('product')
@Controller({
	path: 'product',
	version: [VERSION_NEUTRAL],
})
export class ProductControllerV1 {
	constructor(
		private readonly createProductUseCase: CreateProductUseCase,
		private readonly createTransactionUseCase: CreateTransactionUseCase,
		private readonly listProductUseCase: ListProductUseCase,
		private readonly listTransactionUseCase: ListTransactionUseCase,
	) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		try {
			return await this.createProductUseCase.execute(createProductDto);
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}

	@Get()
	async product_paginated(
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<PageDto<ProductModel>> {
		try {
			const result = await this.listProductUseCase.execute(pageOptionsDto);

			const pageMetaDto = new PageMetaDto({
				pageOptionsDto,
				itemCount: result.total,
			});

			return new PageDto(result.data, pageMetaDto);
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}

	@Post('checkout')
	async checkout(@Body() createTransactionDto: CreateTransactionDto) {
		try {
			return await this.createTransactionUseCase.execute(createTransactionDto);
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}

	@Get('checkout')
	async transaction_paginated(
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<PageDto<TransactionModel>> {
		try {
			const result = await this.listTransactionUseCase.execute(pageOptionsDto);

			const pageMetaDto = new PageMetaDto({
				pageOptionsDto,
				itemCount: result.total,
			});

			return new PageDto(result.data, pageMetaDto);
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}
}
