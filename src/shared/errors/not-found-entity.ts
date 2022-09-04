import { HttpStatus } from '@nestjs/common';
import { CustomHttpError } from './custom-http-error';

/**
 * Classe responsável em disparar erros específicos de entidade não encontrada.
 */
export class EntityNotFoundError extends CustomHttpError {
	/**
	 *
	 * @param entityName Nome da entidade
	 * @param errorInfo Informações do erro
	 */
	constructor(public entityName: string, public errorInfo: string) {
		super(
			`Entity Not Found Error - ${entityName}`,
			errorInfo,
			HttpStatus.NOT_FOUND,
		);
	}
}
