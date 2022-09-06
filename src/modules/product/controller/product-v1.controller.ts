import {
	Controller,
	Post,
	VERSION_NEUTRAL,
	Body,
	HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductUseCase, CreateTransactionUseCase } from '../use-cases';
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
	) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		try {
			return await this.createProductUseCase.execute(createProductDto);
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
}
