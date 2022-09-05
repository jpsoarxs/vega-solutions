import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { InfraModule } from './infra/infra.module';

import { AuthModule } from './modules/auth/auth.module';

import { CustomerModule } from './modules/customer/customer.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.get('postgres.host'),
					port: configService.get('postgres.port'),
					username: configService.get('postgres.user'),
					password: configService.get('postgres.pass'),
					database: configService.get('postgres.db'),
					autoLoadEntities: true,
					synchronize: false,
				};
			},
			inject: [ConfigService],
		}),
		InfraModule,
		AuthModule,
		CustomerModule,
		UserModule,
		ProductModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
