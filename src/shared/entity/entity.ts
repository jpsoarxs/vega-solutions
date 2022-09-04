/**
 * Interface padrão de entidades
 */
export interface IEntity {
	/**
	 * Campo de ID
	 */
	id: string;

	/**
	 * Data de criação
	 */
	created_at: Date;

	/**
	 * Data de atualização
	 */
	updated_at: Date;

	/**
	 * Deve comparar entidades por ID
	 *
	 * @param entity Entidade para comparar
	 */
	equals(entity: IEntity): boolean;

	/**
	 * Deve validar os campos da entidade
	 */
	validate(): void;
}
