import { Global, Module } from '@nestjs/common';
import { CustomLogger, CustomLoggerService } from './';

@Global()
@Module({
	providers: [CustomLogger, CustomLoggerService],
	exports: [CustomLoggerService],
})
export class InfraModule {}
