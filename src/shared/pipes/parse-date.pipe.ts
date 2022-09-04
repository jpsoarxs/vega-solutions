import { Injectable, PipeTransform } from '@nestjs/common';
import { customDateFactory } from '../utils';

/**
 * Pipe de transformar strings em objeto de Data javascript
 */
@Injectable()
export class ParseDatePipe implements PipeTransform {
	/**
	 * Função que transforma o valor de string para data
	 *
	 * @param value parâmetros, query ou body da requisição
	 * @returns valor transformado de strings para data
	 */
	transform(value: any) {
		if (typeof value === 'object') {
			for (const v of Object.entries(value)) {
				if (typeof v[1] === 'string') {
					const date: number = Date.parse(v[1]);

					if (!isNaN(date)) {
						value[v[0]] = customDateFactory(date).toDate();
					}
				}
			}
		}

		return value;
	}
}
