import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { PageDto, PageMetaDto, PageOptionsDto } from '@/shared';
import {
	Controller,
	Post,
	VERSION_NEUTRAL,
	Body,
	HttpException,
	Get,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductModel, TransactionModel } from '../infra';
import {
	CreateProductUseCase,
	CreateTransactionUseCase,
	ListProductUseCase,
	ListTransactionUseCase,
} from '../use-cases';
import { CreateProductDto, CreateTransactionDto } from './dto';

@ApiTags('product')
@ApiBearerAuth('access_token')
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

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		try {
			return await this.createProductUseCase.execute(createProductDto);
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
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
