import {
	Controller,
	Post,
	VERSION_NEUTRAL,
	Body,
	HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductUseCase } from '../use-cases';
import { CreateProductDto } from './dto';

@ApiTags('product')
@Controller({
	path: 'product',
	version: [VERSION_NEUTRAL],
})
export class ProductControllerV1 {
	constructor(private readonly createProductUseCase: CreateProductUseCase) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDto) {
		try {
			return await this.createProductUseCase.execute(createProductDto);
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}
}
