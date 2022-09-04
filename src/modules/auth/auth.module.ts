import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthenticateByPasswordUseCase } from './use-cases/authenticate-by-password.use-case';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../user/infra/models';
import { AuthControllerV1 } from './controllers/auth-v1.controller';
import { LoginUseCase } from './use-cases/login-use-case';
import configuration from '@/config/configuration';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserModel]),
		UserModule,
		PassportModule,
		UserModule,
		JwtModule.register({
			secret: configuration().auth.jwtSecret,
			signOptions: { expiresIn: configuration().auth.signOptions.expiration },
		}),
	],
	providers: [AuthenticateByPasswordUseCase, LoginUseCase, JwtStrategy],
	controllers: [AuthControllerV1],
	exports: [AuthenticateByPasswordUseCase],
})
export class AuthModule {}
