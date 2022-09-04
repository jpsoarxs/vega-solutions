import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModel } from './infra/models';
import { UserRepository } from './infra/repositories';
import { CreateUserUseCase, UserFindAuthUseCase } from './use-cases';

import { UserV1Controller } from './controller/user-v1.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserModel])],
	providers: [UserRepository, CreateUserUseCase, UserFindAuthUseCase],
	controllers: [UserV1Controller],
	exports: [UserFindAuthUseCase],
})
export class UserModule {}
