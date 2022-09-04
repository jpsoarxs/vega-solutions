import { config } from 'dotenv';
import { env } from 'process';

/**
 * Configurações e variáveis de ambiente
 */
export default (): Configuration => {
	config();

	return {
		rabbitmq: {
			host: env.RABBITMQ_HOST,
			port: env.RABBITMQ_PORT,
			user: env.RABBITMQ_USER,
			pass: env.RABBITMQ_PASS,
			queueName: env.RABBITMQ_QUEUE_NAME
				? env.RABBITMQ_QUEUE_NAME.split(',')
				: [],
		},
		postgres: {
			host: env.POSTGRES_HOST,
			port: parseInt(env.POSTGRES_PORT),
			user: env.POSTGRES_USER,
			pass: env.POSTGRES_PASS,
			db: env.POSTGRES_DB,
		},
		environment: {
			nodeEnv: env.NODE_ENV,
			port: parseInt(env.PORT),
		},
		typeorm: {
			postgres: {
				synchronize: process.env.TYPEORM_POSTGRES_SYNCHRONIZE === 'true',
				logging: process.env.TYPEORM_POSTGRES_LOGGING === 'true',
				logger: process.env.TYPEORM_POSTGRES_LOGGER,
				entities: process.env.TYPEORM_POSTGRES_ENTITIES,
				migrations: process.env.TYPEORM_POSTGRES_MIGRATIONS,
			},
		},
		httpService: {
			timeout: parseInt(process.env.HTTP_DEFAULT_TIMEOUT),
			maxRedirects: parseInt(process.env.HTTP_DEFAULT_MAX_REDIRECTS),
		},
		auth: {
			saltRounds: parseInt(env.AUTH_SALT_ROUNDS),
			jwtSecret: env.JWT_SECRET,
			signOptions: {
				expiration: env.SIGN_EXPIRATION,
			},
		},
	};
};

/**
 * Tipos da configuração
 */
type Configuration = {
	rabbitmq: {
		host: string;
		port: string;
		user: string;
		pass: string;
		queueName: string[];
	};
	postgres: {
		host: string;
		port: number;
		user: string;
		pass: string;
		db: string;
	};
	environment: {
		nodeEnv: string;
		port: number;
	};
	typeorm: {
		postgres: {
			synchronize: boolean;
			logging: boolean;
			logger: string;
			entities: string;
			migrations: string;
		};
	};
	httpService: {
		timeout: number;
		maxRedirects: number;
	};
	auth: {
		saltRounds: number;
		jwtSecret: string;
		signOptions: {
			expiration: string;
		};
	};
};
