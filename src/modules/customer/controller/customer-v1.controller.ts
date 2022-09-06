import {
	Body,
	Controller,
	Get,
	HttpException,
	Post,
	Query,
	UseGuards,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { CustomerModel } from '../infra/models';

import { CreateCustomerDto } from '@/modules/customer/controller/dto';
import {
	CreateCustomerUseCase,
	ListCustomerUseCase,
} from '@/modules/customer/use-cases';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { PageDto, PageMetaDto, PageOptionsDto } from '@/shared';

@ApiTags('customer')
@ApiBearerAuth('access_token')
@Controller({
	path: 'customer',
	version: [VERSION_NEUTRAL],
})
export class CustomerV1Controller {
	constructor(
		private readonly createCustomerUseCase: CreateCustomerUseCase,
		private readonly listCustomerUseCase: ListCustomerUseCase,
	) {}

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

	@Get()
	async paginated(
		@Query() pageOptionsDto: PageOptionsDto,
	): Promise<PageDto<CustomerModel>> {
		try {
			const result = await this.listCustomerUseCase.execute(pageOptionsDto);

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
