import { DataSource, Logger } from 'typeorm';
import environmentConfig from '../config/configuration';

const env = environmentConfig();

type LoggerEnum =
	| 'advanced-console'
	| 'simple-console'
	| 'file'
	| 'debug'
	| Logger;

export default new DataSource({
	type: 'postgres',
	host: env.postgres.host,
	port: env.postgres.port,
	username: env.postgres.user,
	password: env.postgres.pass,
	database: env.postgres.db,
	entities: [env.typeorm.postgres.entities],
	migrations: [env.typeorm.postgres.migrations],
	synchronize: env.typeorm.postgres.synchronize,
	logging: env.typeorm.postgres.logging,
	logger: env.typeorm.postgres.logger as LoggerEnum,
	migrationsTransactionMode: 'each',
});
