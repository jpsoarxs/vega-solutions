import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModel, ProductRepository } from './infra';
import { CreateProductUseCase } from './use-cases';

import { ProductControllerV1 } from './controller/product-v1.controller';

@Module({
	imports: [TypeOrmModule.forFeature([ProductModel])],
	providers: [ProductRepository, CreateProductUseCase],
	controllers: [ProductControllerV1],
})
export class ProductModule {}
