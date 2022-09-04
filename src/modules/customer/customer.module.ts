import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModel, CustomerModel } from './infra/models';
import { CustomerRepository } from './infra/repositories';
import { CreateCustomerUseCase } from './use-cases';

import { CustomerV1Controller } from './controller/customer-v1.controller';

@Module({
	imports: [TypeOrmModule.forFeature([CustomerModel, AddressModel])],
	providers: [CustomerRepository, CreateCustomerUseCase],
	controllers: [CustomerV1Controller],
})
export class CustomerModule {}
