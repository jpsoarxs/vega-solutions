import { FieldsErrors } from '@/shared/validators/validator-fields-interface';
import { HttpStatus } from '@nestjs/common';
import { CustomHttpError } from './custom-http-error';

/**
 * Classe responsável em disparar erros específicos de validação de entidade.
 */
export class EntityValidationError extends CustomHttpError {
	/**
	 *
	 * @param entityName Nome da entidade
	 * @param error Erros de validações
	 * @param statusCode Código de retorno da API
	 */
	constructor(
		public entityName: string,
		public error: FieldsErrors,
		public statusCode: HttpStatus,
	) {
		super('Entity Validation Error', error, statusCode);
	}
}
