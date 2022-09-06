import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
	ProductModel,
	ProductRepository,
	TransactionModel,
	TransactionRepository,
} from './infra';
import {
	CreateProductUseCase,
	FindByIdProductUseCase,
	CreateTransactionUseCase,
	ListProductUseCase,
	ListTransactionUseCase,
} from './use-cases';

import { ProductControllerV1 } from './controller/product-v1.controller';
import { FindByIdCustomerUseCase } from '../customer/use-cases';
import { CustomerRepository, CustomerModel } from '../customer/infra';
@Module({
	imports: [
		TypeOrmModule.forFeature([ProductModel, TransactionModel, CustomerModel]),
	],
	providers: [
		ProductRepository,
		TransactionRepository,
		CreateProductUseCase,
		FindByIdProductUseCase,
		CreateTransactionUseCase,
		FindByIdCustomerUseCase,
		CustomerRepository,
		ListProductUseCase,
		ListTransactionUseCase,
	],
	exports: [FindByIdProductUseCase],
	controllers: [ProductControllerV1],
})
export class ProductModule {}
