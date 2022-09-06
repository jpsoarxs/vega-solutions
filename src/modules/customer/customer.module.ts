import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModel, CustomerModel, CustomerRepository } from './infra';
import { CreateCustomerUseCase, FindByIdCustomerUseCase } from './use-cases';

import { CustomerV1Controller } from './controller/customer-v1.controller';

@Module({
	imports: [TypeOrmModule.forFeature([CustomerModel, AddressModel])],
	providers: [
		CustomerRepository,
		CreateCustomerUseCase,
		FindByIdCustomerUseCase,
	],
	exports: [FindByIdCustomerUseCase],
	controllers: [CustomerV1Controller],
})
export class CustomerModule {}
