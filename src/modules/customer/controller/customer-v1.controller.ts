import {
	Body,
	Controller,
	HttpException,
	Post,
	UseGuards,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CustomerModel } from '../infra/models';

import { CreateCustomerDto } from '@/modules/customer/controller/dto';
import { CreateCustomerUseCase } from '@/modules/customer/use-cases';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';

@ApiTags('customer')
@ApiBearerAuth('access_token')
@Controller({
	path: 'customer',
	version: [VERSION_NEUTRAL],
})
export class CustomerV1Controller {
	constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(
		@Body() createCustomerDto: CreateCustomerDto,
	): Promise<CustomerModel> {
		try {
			const customer = await this.createCustomerUseCase.execute(
				createCustomerDto,
			);
			return customer;
		} catch (err) {
			throw new HttpException(err, err.statusCode);
		}
	}
}
