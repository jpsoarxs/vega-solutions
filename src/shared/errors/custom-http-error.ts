import { FieldsErrors } from '@/shared/validators/validator-fields-interface';
import { HttpStatus } from '@nestjs/common';

/**
 * Classe que implementa a excessão de erro padrão do javascript
 * e implementa informações adicionais para retorno de erros mais completos
 * nas apis.
 */
export class CustomHttpError extends Error {
	/**
	 *
	 * @param name Nome do erro
	 * @param error Mensagem de erro
	 * @param statusCode Código de retorno para a API
	 */
	constructor(
		public name: string,
		public error: FieldsErrors | string,
		public statusCode: HttpStatus,
	) {
		super(name);
		this.name = name;
	}
}
