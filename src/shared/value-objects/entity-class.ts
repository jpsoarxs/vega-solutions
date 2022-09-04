import { IsDate, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { customDateFactory } from '../../shared';

export type EntityClassProps = {
	id?: string;
	created_at?: Date | string;
};

/**
 * Classe padrão de entidades para extender os atributos básicos
 */
export abstract class EntityClass {
	/**
	 * Identificador único da entidade
	 */
	@IsUUID()
	id: string;

	/**
	 * Data de criação da entidade
	 */
	@IsDate()
	created_at: Date;

	/**
	 * Data de atualização da entidade
	 */
	@IsDate()
	updated_at: Date;

	constructor(entityClassProps?: EntityClassProps | undefined) {
		this.id = (entityClassProps && entityClassProps.id) || uuidv4();
		this.created_at = customDateFactory(
			entityClassProps ? entityClassProps.created_at : undefined,
		).toDate();
		this.updated_at = customDateFactory().toDate();
	}
}
